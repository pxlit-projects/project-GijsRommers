package be.pxl.services.api.controller;

import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.services.IReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class ReviewController {
    private final IReviewService reviewService;

    @GetMapping
    public List<PostResponse> getPostsInForSubmission() {
        return reviewService.getToReviewedPosts();
    }

}
