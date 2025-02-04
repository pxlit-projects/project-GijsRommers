package be.pxl.services.api.controller;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.services.IPostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final IPostService postService;

    @GetMapping
    public List<PostResponse> getPublishedPosts() {
        log.info("Received request to get published posts");
        return postService.getPublishedPosts();
    }

    @GetMapping("/{id}")
    public PostResponse getPostById(@PathVariable Long id) {
        return postService.getPostById(id);
    }

    @GetMapping("/review")
    public List<PostResponse> getToReviewedPosts() {
        return postService.getToBeReviewedPosts();
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
    public List<PostResponse> getFilteredPosts(@RequestParam String content, @RequestParam String author, @RequestParam String date) {
        log.info("Received request to get filtered posts with content: {}, author: {}, date: {}", content, author, date);
        LocalDateTime parsedDate = (date != null && !date.isEmpty()) ? LocalDate.parse(date).atStartOfDay() : LocalDateTime.of(1970, 1, 1, 0, 0);
        return postService.getFilteredPosts(content, author, parsedDate);
    }

    @GetMapping("/user/{username}")
    public List<PostResponse> getUserPosts(@PathVariable String username) {
        log.info("Received request to get all user posts");
        return postService.getUserPosts(username);
    }
}