package be.pxl.services.api.controller;

import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.services.IPostStatusListenerService;
import be.pxl.services.services.IReviewQueueService;
import be.pxl.services.services.IReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public void rejectPost(@PathVariable String postId) {
        log.info("Received request to reject post with ID: {}", postId);
        reviewQueueService.sendRejectionMessage(postId);
    }
}