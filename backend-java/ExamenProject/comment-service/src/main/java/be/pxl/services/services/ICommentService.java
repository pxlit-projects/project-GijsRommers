package be.pxl.services.services;

import be.pxl.services.api.dto.request.CommentRequest;
import be.pxl.services.api.dto.response.CommentResponse;
import be.pxl.services.domain.Comment;

import java.util.List;

public interface ICommentService {
    void addComment(CommentRequest comment);
    List<CommentResponse> getCommentsByPostId(Long postId);
    void updateComment(Long commentId, String content);
    void deleteComment(Long commentId);
}
