import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Comment } from '../../models/comment.model';
import { provideHttpClient } from '@angular/common/http';

describe('CommentService', () => {
  let service: CommentService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommentService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(CommentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve comments by post ID via GET', () => {
    const postId = '1';
    const mockComments: Comment[] = [
      { id: 1, postId: 1, userName: 'author1', content: 'Comment 1', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, postId: 1, userName: 'author2', content: 'Comment 2', createdAt: new Date(), updatedAt: new Date() }
    ];

    service.getCommentsByPostId(postId).subscribe(comments => {
      expect(comments).toEqual(mockComments);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/post/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComments);
  });

  it('should add a comment via POST', () => {
    const newComment: Comment = { id: 3, postId: 1, userName: 'author3', content: 'Comment 3', createdAt: new Date(), updatedAt: new Date() };

    service.addComment(newComment).subscribe(comment => {
      expect(comment).toEqual(newComment);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newComment);
    req.flush(newComment);
  });

  it('should update a comment via PUT', () => {
    const updatedComment: Comment = { id: 1, postId: 1, userName: 'author1', content: 'Updated Comment 1', createdAt: new Date(), updatedAt: new Date() };

    service.updateComment(updatedComment).subscribe();

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${updatedComment.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ content: updatedComment.content });
    req.flush({});
  });

  it('should delete a comment via DELETE', () => {
    const commentId = 1;

    service.deleteComment(commentId).subscribe();

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${commentId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
