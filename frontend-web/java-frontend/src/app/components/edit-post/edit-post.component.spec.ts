import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EditPostComponent} from './edit-post.component';
import {PostService} from '../../service/post/post.service';
import {AuthService} from '../../service/auth/auth.service';
import {ReviewService} from '../../service/review/review.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {BehaviorSubject, of} from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EditPostComponent', () => {
  let component: EditPostComponent;
  let fixture: ComponentFixture<EditPostComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let authService: jasmine.SpyObj<AuthService>;
  let reviewService: jasmine.SpyObj<ReviewService>;
  let router: jasmine.SpyObj<Router>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPostById', 'updatePost']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      username: new BehaviorSubject<string | null>('testUser'),
      role: new BehaviorSubject<string | null>('user'),
    });
    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getReviewByPostId']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = {snapshot: {paramMap: {get: () => '1'}}};

    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule,
      ],
      providers: [
        {provide: PostService, useValue: postServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: ReviewService, useValue: reviewServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        DatePipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    reviewService = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post and reviews on init', () => {
    const mockPost = {title: 'Test Post', author: 'testUser', content: 'Test Content', isDraft: false};
    const mockReviews = [{id: 1, postId: 1, username: 'user1', comment: 'Great post!', reviewTime: new Date()}];

    postService.getPostById.and.returnValue(of(mockPost));
    reviewService.getReviewByPostId.and.returnValue(of(mockReviews));

    component.ngOnInit();
    fixture.detectChanges();

    expect(postService.getPostById).toHaveBeenCalledWith('1');
    expect(reviewService.getReviewByPostId).toHaveBeenCalledWith('1');
    expect(component.postForm.value).toEqual(mockPost);
    expect(component.reviews).toEqual(mockReviews);
  });

  it('should update post and navigate on valid form submission', () => {
    const mockPost = {title: 'Updated Post', author: 'testUser', content: 'Updated Content', isDraft: false};
    component.postForm.setValue(mockPost);

    postService.updatePost.and.returnValue(of(void 0));
    component.onSubmit();

    expect(postService.updatePost).toHaveBeenCalledWith('1', mockPost);
    expect(router.navigate).toHaveBeenCalledWith(['/add-post']);
  });

  it('should not update post on invalid form submission', () => {
    component.postForm.setValue({title: '', author: '', content: '', isDraft: false});

    component.onSubmit();

    expect(postService.updatePost).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });
});


