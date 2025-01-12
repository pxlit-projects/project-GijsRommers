package be.pxl.services.services;

import be.pxl.services.ReviewServiceApplication;
import be.pxl.services.api.dto.request.ReviewRequest;
import be.pxl.services.api.dto.response.ReviewResponse;
import be.pxl.services.api.exceptions.NotFoundException;
import be.pxl.services.domain.Review;
import be.pxl.services.repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(classes = ReviewServiceApplication.class)
@Testcontainers
@ActiveProfiles("test")
class ReviewServiceTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private ReviewRepository reviewRepository;

    @BeforeEach
    void cleanup() {
        reviewRepository.deleteAll();
    }

    @Test
    void saveReview_ShouldSaveReview() {
        ReviewRequest reviewRequest = new ReviewRequest(1L, "user", "comment");

        reviewService.saveReview(reviewRequest);

        List<Review> reviews = reviewRepository.findAll();
        assertEquals(1, reviews.size());
        assertEquals("user", reviews.getFirst().getUsername());
        assertEquals("comment", reviews.getFirst().getComment());
    }

    @Test
    void getReviewByPostId_ShouldReturnListOfReviewResponses() {
        Long postId = 1L;
        Review review1 = new Review(new ReviewRequest(postId, "user1", "Great post"));
        Review review2 = new Review(new ReviewRequest(postId, "user2", "Needs improvement"));
        reviewRepository.save(review1);
        reviewRepository.save(review2);

        List<ReviewResponse> actualReviews = reviewService.getReviewByPostId(postId);

        assertEquals(2, actualReviews.size());
        assertEquals("user1", actualReviews.get(0).username());
        assertEquals("user2", actualReviews.get(1).username());
    }

    @Test
    void getReviewByPostId_ShouldThrowNotFoundException_WhenNoReviewsFound() {
        Long postId = 1L;

        assertThrows(NotFoundException.class, () -> reviewService.getReviewByPostId(postId));
    }
}