import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostDetailComponent } from './post-detail.component';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../service/post/post.service';
import { CommentService } from '../../service/comment/comment.service';
import { AuthService } from '../../service/auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject, of } from 'rxjs';
import { Post } from '../../models/post.model';
import { Comment } from '../../models/comment.model';

describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let postService: jasmine.SpyObj<PostService>;
  let commentService: jasmine.SpyObj<CommentService>;
  let authService: jasmine.SpyObj<AuthService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    const postServiceSpy = jasmine.createSpyObj('PostService', ['getPostById']);
    const commentServiceSpy = jasmine.createSpyObj('CommentService', ['getCommentsByPostId', 'addComment', 'updateComment', 'deleteComment']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [], {
      username: new BehaviorSubject<string | null>('testUser'),
      role: new BehaviorSubject<string | null>('user')
    });

    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: PostService, useValue: postServiceSpy },
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    postService = TestBed.inject(PostService) as jasmine.SpyObj<PostService>;
    commentService = TestBed.inject(CommentService) as jasmine.SpyObj<CommentService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load post and comments on init', () => {
    const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' };
    const comments: Comment[] = [{ id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() }];
    postService.getPostById.and.returnValue(of(post));
    commentService.getCommentsByPostId.and.returnValue(of(comments));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.post).toEqual(post);
    expect(component.comments).toEqual(comments);
  });

  it('should add a new comment', () => {
    const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' };
    postService.getPostById.and.returnValue(of(post));

    const initialComments: Comment[] = [];
    commentService.getCommentsByPostId.and.returnValue(of(initialComments));

    component.ngOnInit();
    fixture.detectChanges();
    const newComment: Comment = {
      id: 1,
      userName: 'testUser',
      content: 'New Comment',
      postId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    commentService.addComment.and.returnValue(of(newComment));
    commentService.getCommentsByPostId.and.returnValue(of([newComment]));

    component.newComment.content = 'New Comment';
    component.onSubmit();
    fixture.detectChanges();
    expect(component.newComment.content).toBe('');
    expect(component.comments).toEqual([newComment]);
  });

  it('should cancel editing a comment', () => {
    const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' };
    postService.getPostById.and.returnValue(of(post));
    const comments = [{ id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() }];
    commentService.getCommentsByPostId.and.returnValue(of(comments));
    component.ngOnInit();
    fixture.detectChanges();
    component.editingComment = { id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() };
    component.cancelEdit();
    fixture.detectChanges();
    expect(component.editingComment).toBeNull();
  });

  it('should delete a comment', () => {
    const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' };
    postService.getPostById.and.returnValue(of(post));
    const comments = [{ id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() }];
    commentService.getCommentsByPostId.and.returnValue(of(comments));
    component.ngOnInit();
    fixture.detectChanges();
    const commentId = 1;
    commentService.deleteComment.and.returnValue(of(void 0));
    component.deleteComment(commentId);
    fixture.detectChanges();
    expect(component.comments.length).toBe(0);
  });


  it('should track comments by id', () => {
    const comment: Comment = { id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() };
    const trackById = component.trackByComment(0, comment);

    expect(trackById).toBe(comment.id);
  });

  it('should cancel editing a comment', () => {
    const post: Post = { id: 1, title: 'Test Post', content: 'Test Content', author: 'testUser' };
    postService.getPostById.and.returnValue(of(post));
    const comments = [{ id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() }];
    commentService.getCommentsByPostId.and.returnValue(of(comments));
    component.ngOnInit();
    fixture.detectChanges();
    component.editingComment = { id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() };
    component.cancelEdit();
    fixture.detectChanges();
    expect(component.editingComment).toBeNull();
  })

  it('should return true if a comment is being edited', () => {
    const comment: Comment = { id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() };
    component.editingComment = comment;

    const isEditing = component.isEditing(comment);

    expect(isEditing).toBeTrue();
  });

  it('should return false if a comment is not being edited', () => {
    const comment: Comment = { id: 1, userName: 'testUser', content: 'Test Comment', postId: 1, createdAt: new Date(), updatedAt: new Date() };
    component.editingComment = null;

    const isEditing = component.isEditing(comment);

    expect(isEditing).toBeFalse();
  });
});
