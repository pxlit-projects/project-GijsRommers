package be.pxl.services.api.controller;

import be.pxl.services.api.dto.request.CommentRequest;
import be.pxl.services.api.dto.response.CommentResponse;
import be.pxl.services.services.ICommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
public class CommentController {

    private final ICommentService commentService;

    @PostMapping
    public void addComment(@RequestBody @Valid CommentRequest commentRequest) {
        commentService.addComment(commentRequest);
    }

    @GetMapping("/post/{postId}")
    public List<CommentResponse> getCommentsByPostId(@PathVariable Long postId) {
        return commentService.getCommentsByPostId(postId);
    }

    @PutMapping("/{commentId}")
    public void updateComment(@PathVariable Long commentId, @RequestBody CommentRequest commentRequest) {
        commentService.updateComment(commentId, commentRequest.content());
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }
}