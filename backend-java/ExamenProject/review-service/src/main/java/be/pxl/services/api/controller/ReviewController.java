package be.pxl.services.api.controller;

import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.services.IReviewService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
@Slf4j
public class ReviewController {
    private final IReviewService reviewService;

    @GetMapping
    public List<PostResponse> getPostsInForSubmission() {
        log.info("Received request to get posts in for submission");
        return reviewService.getToReviewedPosts();
    }

}
