package be.pxl.services.services;

import be.pxl.services.api.dto.request.CommentRequest;
import be.pxl.services.api.dto.response.CommentResponse;
import be.pxl.services.api.exceptions.NotFoundException;
import be.pxl.services.domain.Comment;
import be.pxl.services.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;


    @Override
    public void addComment(CommentRequest commentRequest) {
        Comment comment = new Comment(commentRequest);
        commentRepository.save(comment);
    }

    @Override
    public List<CommentResponse> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId).stream().map(CommentResponse::new).toList();
    }

    @Override
    public void updateComment(Long commentId, String content) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new NotFoundException("Comment not found, id: " + commentId));
        comment.setContent(content);
        comment.setUpdatedAt(LocalDateTime.now());
        commentRepository.save(comment);
    }

    @Override
    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }
}