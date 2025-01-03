package be.pxl.services.api.controller;

import be.pxl.services.api.dto.request.ReviewRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.api.dto.response.ReviewResponse;
import be.pxl.services.services.IReviewQueueService;
import be.pxl.services.services.IReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final IReviewService reviewService;
    private final IReviewQueueService reviewQueueService;

    @GetMapping
    public List<PostResponse> getPostsInForSubmission() {
        log.info("Received request to get posts in for submission");
        return reviewService.getToReviewedPosts();
    }

    @PostMapping("/approve/{postId}")
    public void approvePost(@PathVariable String postId) {
        log.info("Received request to approve post with ID: {}", postId);
        reviewQueueService.sendApprovalMessage(postId);
    }

    @PostMapping("/reject/{postId}")
    public void rejectPost(@PathVariable String postId, @RequestBody @Valid ReviewRequest reviewDTO) {
        log.info("Received request to reject post with ID: {}", postId);
        reviewService.saveReview(reviewDTO);
        reviewQueueService.sendRejectionMessage(postId);
    }

    @GetMapping("/{postId}")
    public List<ReviewResponse> getReviewByPostId(@PathVariable Long postId) {
        log.info("Received request to get review for post ID: {}", postId);
        return reviewService.getReviewByPostId(postId);
    }
}