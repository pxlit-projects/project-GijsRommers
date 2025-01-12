package be.pxl.services.api.controller;

import be.pxl.services.ReviewServiceApplication;
import be.pxl.services.api.dto.request.ReviewRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.api.dto.response.ReviewResponse;
import be.pxl.services.client.PostClient;
import be.pxl.services.services.IReviewQueueService;
import be.pxl.services.services.IReviewService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest(classes = ReviewServiceApplication.class)
@ActiveProfiles("test")
class ReviewControllerTest {

    @Mock
    private IReviewService reviewService;

    @Mock
    private IReviewQueueService reviewQueueService;

    @Mock
    private PostClient postServiceClient;

    @InjectMocks
    private ReviewController reviewController;

    @Test
    void getPostsInForSubmission_ShouldReturnListOfPostResponses() {
        List<PostResponse> expectedPosts = List.of(
                new PostResponse(1L, "Title 1", "Content 1", "Author 1", LocalDateTime.now(), false),
                new PostResponse(2L, "Title 2", "Content 2", "Author 2", LocalDateTime.now(), true)
        );
        when(reviewService.getToReviewedPosts()).thenReturn(expectedPosts);

        List<PostResponse> actualPosts = reviewController.getPostsInForSubmission();

        assertEquals(expectedPosts, actualPosts);
        verify(reviewService).getToReviewedPosts();
    }

    @Test
    void approvePost_ShouldSendApprovalMessage() {
        String postId = "123";

        reviewController.approvePost(postId);

        verify(reviewQueueService).sendApprovalMessage(postId);
    }

    @Test
    void rejectPost_ShouldSaveReviewAndSendRejectionMessage() {
        String postId = "123";
        ReviewRequest reviewRequest = new ReviewRequest(1L, "user", "comment");

        reviewController.rejectPost(postId, reviewRequest);

        verify(reviewService).saveReview(reviewRequest);
        verify(reviewQueueService).sendRejectionMessage(postId);
    }

    @Test
    void getReviewByPostId_ShouldReturnListOfReviewResponses() {
        Long postId = 1L;
        List<ReviewResponse> expectedReviews = List.of(
                new ReviewResponse(1L, postId, "user1", "Great post", LocalDateTime.now()),
                new ReviewResponse(2L, postId, "user2", "Needs improvement", LocalDateTime.now())
        );
        when(reviewService.getReviewByPostId(postId)).thenReturn(expectedReviews);

        List<ReviewResponse> actualReviews = reviewController.getReviewByPostId(postId);

        assertEquals(expectedReviews, actualReviews);
        verify(reviewService).getReviewByPostId(postId);
    }
}
