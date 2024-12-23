package be.pxl.services.api.controller;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.services.IPostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class PostController {

    private final IPostService postService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createPost(@RequestBody PostRequest post) {
        postService.createPost(post);
    }
}