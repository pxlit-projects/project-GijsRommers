package be.pxl.services.api.controller;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.services.IPostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final IPostService postService;

    @GetMapping
    public List<PostResponse> getPublishedPosts() {
        log.info("Received request to get published posts");
        return postService.getPublishedPosts();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPost(@RequestBody PostRequest post) {
        log.info("Received request to create a post");
        postService.createPost(post);
    }

    @PatchMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void updatePost(@PathVariable Long id, @RequestBody PostRequest post) {
        log.info("Received request to update post with ID: {}", id);
        postService.updatePost(id, post);
    }

    @GetMapping("/filtered")
    public List<PostResponse> getFilteredPosts(@RequestParam String content, @RequestParam String author, @RequestParam LocalDateTime startDate, @RequestParam LocalDateTime endDate) {
        log.info("Received request to get filtered posts with content: {}, author: {}, startDate: {}, endDate: {}", content, author, startDate, endDate);
        return postService.getFilteredPosts(content, author, startDate, endDate);
    }
}