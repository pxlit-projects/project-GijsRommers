import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddPostComponent } from './add-post.component';
import { PostService } from '../../service/post/post.service';
import { AuthService } from '../../service/auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


describe('AddPostComponent', () => {
  let component: AddPostComponent;
  let fixture: ComponentFixture<AddPostComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['createPost']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], { username: new BehaviorSubject<string | null>('testUser') });
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
        FormsModule
      ],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set author from authService on init', () => {
    expect(component.post.author).toBe('testUser');
  });

  it('should create post and navigate on valid form submission', () => {
    component.post = { title: 'New Post', content: 'Content', author: 'testUser', isDraft: false };
    postService.createPost.and.returnValue(of(void 0));
    component.onSubmit();
    expect(postService.createPost).toHaveBeenCalledWith(component.post);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
