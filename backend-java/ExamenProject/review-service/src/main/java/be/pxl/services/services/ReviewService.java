package be.pxl.services.services;

import be.pxl.services.api.dto.request.ReviewRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.api.dto.response.ReviewResponse;
import be.pxl.services.client.PostClient;
import be.pxl.services.domain.Review;
import be.pxl.services.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService implements IReviewService {

    private final ReviewRepository reviewRepository;
    private final PostClient postServiceClient;

    @Override
    public List<PostResponse> getToReviewedPosts() {
        log.info("Fetching posts to be reviewed");
        return postServiceClient.getToBeReviewedPosts();
    }

    @Override
    public void saveReview(ReviewRequest reviewDTO) {
        log.info("Saving review: {}", reviewDTO);
        Review review = new Review(reviewDTO);
        reviewRepository.save(review);
    }

    @Override
    public List<ReviewResponse> getReviewByPostId(Long postId) {
        log.info("Fetching review for post ID: {}", postId);
        return reviewRepository.findByPostId(postId).stream().map(ReviewResponse::new).toList();
    }
}
