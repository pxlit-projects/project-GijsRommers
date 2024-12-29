package be.pxl.services.api.dto.response;

import be.pxl.services.domain.Review;

import java.time.LocalDateTime;

public record ReviewResponse(Long id, Long postId, String username, String comment, LocalDateTime reviewTime) {
    public ReviewResponse(Review review) {
        this(review.getId(), review.getPostId(), review.getUsername(), review.getComment(), review.getReviewTime());
    }
}