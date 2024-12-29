package be.pxl.services.services;

import be.pxl.services.api.dto.request.ReviewRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.api.dto.response.ReviewResponse;

import java.util.List;

public interface IReviewService {
    List<PostResponse> getToReviewedPosts();

    void saveReview(ReviewRequest reviewDTO);

    List<ReviewResponse> getReviewByPostId(Long postId);
}
