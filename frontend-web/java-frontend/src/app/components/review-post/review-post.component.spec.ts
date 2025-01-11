import { BehaviorSubject, of } from 'rxjs';
import { ReviewPostComponent } from './review-post.component';
import { ReviewService } from '../../service/review/review.service';
import { AuthService } from '../../service/auth/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RejectDialogComponent } from '../reject-dialog/reject-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

describe('ReviewPostComponent', () => {
  let component: ReviewPostComponent;
  let fixture: ComponentFixture<ReviewPostComponent>;
  let reviewService: jasmine.SpyObj<ReviewService>;
  let authService: AuthService;
  let dialog: jasmine.SpyObj<MatDialog>;
  let usernameSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    const reviewServiceSpy = jasmine.createSpyObj('ReviewService', ['getReviews', 'approveReview', 'rejectReview']);
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: {} } });

    usernameSubject = new BehaviorSubject<string | null>('testUser');
    authService = { username: usernameSubject } as AuthService;

    await TestBed.configureTestingModule({
      providers: [
        { provide: ReviewService, useValue: reviewServiceSpy },
        { provide: AuthService, useValue: authService },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewPostComponent);
    component = fixture.componentInstance;
    reviewService = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;

    reviewService.getReviews.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load posts on init', () => {
    const posts = [{ id: 1, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    reviewService.getReviews.and.returnValue(of(posts));
    component.ngOnInit();
    expect(component.posts).toEqual(posts);
  });

  it('should approve post', () => {
    const postId = 1;
    component.posts = [{ id: postId, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    reviewService.approveReview.and.returnValue(of(void 0));
    component.approvePost(postId);
    expect(component.posts.length).toBe(0);
  });

  it('should open reject dialog and reject post', () => {
    const postId = 1;
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of('reason') });
    dialog.open.and.returnValue(dialogRefSpy);
    reviewService.rejectReview.and.returnValue(of(void 0));
    component.posts = [{ id: postId, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    component.openRejectDialog(postId);
    expect(dialog.open).toHaveBeenCalledWith(RejectDialogComponent, { width: '250px', data: { postId } });
    expect(component.posts.length).toBe(0);
  });

  it('should not reject post if dialog is closed without reason', () => {
    const postId = 1;
    const dialogRefSpy = jasmine.createSpyObj({ afterClosed: of(null) });
    dialog.open.and.returnValue(dialogRefSpy);
    component.posts = [{ id: postId, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    component.openRejectDialog(postId);
    expect(dialog.open).toHaveBeenCalledWith(RejectDialogComponent, { width: '250px', data: { postId } });
    expect(component.posts.length).toBe(1);
  });

  it('should handle rejection without username', () => {
    usernameSubject.next(null);
    const postId = 1;
    component.posts = [{ id: postId, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    component.rejectReview(postId, 'reason');
    expect(reviewService.rejectReview).not.toHaveBeenCalled();
    expect(component.posts.length).toBe(1);
  });

  it('should set username on init', () => {
    const username = 'testUser';
    usernameSubject.next(username);
    fixture.detectChanges();
    expect(component.username).toBe(username);
  });

  it('should not set username if null on init', () => {
    usernameSubject.next(null);
    fixture.detectChanges();
    expect(component.username).toBeNull();
  });

  it('should filter posts after approving a post', () => {
    const postId = 1;
    component.posts = [{ id: postId, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    reviewService.approveReview.and.returnValue(of(void 0));
    component.approvePost(postId);
    expect(component.posts.length).toBe(0);
  });

  it('should call rejectReview if reason is provided', () => {
    const postId = 1;
    const reason = 'Test Reason';
    component.posts = [{ id: postId, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    reviewService.rejectReview.and.returnValue(of(void 0));
    component.rejectReview(postId, reason);
    expect(reviewService.rejectReview).toHaveBeenCalled();
    expect(component.posts.length).toBe(0);
  });

  it('should not call rejectReview if username is null', () => {
    usernameSubject.next(null);
    const postId = 1;
    const reason = 'Test Reason';
    component.posts = [{ id: postId, title: 'Test Post', content: 'Test Content', author: 'Test Author' }];
    component.rejectReview(postId, reason);
    expect(reviewService.rejectReview).not.toHaveBeenCalled();
    expect(component.posts.length).toBe(1);
  });
});
