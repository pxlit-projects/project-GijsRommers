import { TestBed } from '@angular/core/testing';
import { ReviewService } from './review.service';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import { RejectionModel } from '../../models/Rejection.model';
import { Review } from '../../models/Review.model';
import { Post } from '../../models/post.model';
import { provideHttpClient, } from '@angular/common/http';

describe('ReviewService', () => {
  let service: ReviewService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ReviewService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ReviewService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should retrieve reviews via GET', () => {
    const mockPosts: Post[] = [
      { id: 1, title: 'Post 1', content: 'Content 1', author: 'author1' },
      { id: 2, title: 'Post 2', content: 'Content 2', author: 'author2' }
    ];

    service.getReviews().subscribe(posts => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });

  it('should approve a review via POST', () => {
    const postId = '123';

    service.approveReview(postId).subscribe();

    const req = httpTestingController.expectOne(`${service['baseUrl']}/approve/${postId}`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('should reject a review via POST', () => {
    const postId = '123';
    const rejection: RejectionModel = { postId: 123, username: 'user1', comment: 'Inappropriate content' };

    service.rejectReview(postId, rejection).subscribe();

    const req = httpTestingController.expectOne(`${service['baseUrl']}/reject/${postId}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(rejection);
    req.flush({});
  });

  it('should retrieve reviews by post ID via GET', () => {
    const postId = '123';
    const mockReviews: Review[] = [
      { id: 1, postId: 123, username: 'user1', comment: 'Review 1', reviewTime: new Date() },
      { id: 2, postId: 123, username: 'user2', comment: 'Review 2', reviewTime: new Date() }
    ];

    service.getReviewByPostId(postId).subscribe(reviews => {
      expect(reviews).toEqual(mockReviews);
    });

    const req = httpTestingController.expectOne(`${service['baseUrl']}/${postId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReviews);
  });
});
