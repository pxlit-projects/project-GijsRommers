import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserPostsComponent } from './user-posts.component';
import { PostService } from '../../service/post/post.service';
import { AuthService } from '../../service/auth/auth.service';
import { BehaviorSubject, of } from 'rxjs';
import { Post } from '../../models/post.model';

describe('UserPostsComponent', () => {
  let component: UserPostsComponent;
  let fixture: ComponentFixture<UserPostsComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let authService: jasmine.SpyObj<AuthService>;
  let usernameSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getUserPosts']);
    usernameSubject = new BehaviorSubject<string | null>('testUser');
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], { username: usernameSubject });

    await TestBed.configureTestingModule({
      imports: [UserPostsComponent],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserPostsComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user posts on init if username is available', () => {
    const posts: Post[] = [{ id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' }];
    postService.getUserPosts.and.returnValue(of(posts));
    component.ngOnInit();
    expect(component.posts).toEqual(posts);
  });

  it('should not load user posts on init if username is not available', () => {
    usernameSubject.next(null);
    component.ngOnInit();
    expect(component.posts).toEqual([]);
  });

  it('should replace underscores with spaces in status', () => {
    const status = 'IN_PROGRESS';
    const result = component.replaceUnderscoreWithSpace(status);
    expect(result).toBe('IN PROGRESS');
  });

  it('should return empty string if status is undefined', () => {
    const result = component.replaceUnderscoreWithSpace(undefined);
    expect(result).toBe('');
  });
});
