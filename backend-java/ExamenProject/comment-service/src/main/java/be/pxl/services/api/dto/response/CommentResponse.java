package be.pxl.services.api.dto.response;


import be.pxl.services.domain.Comment;

import java.time.LocalDateTime;

public record CommentResponse(Long id, Long postId, String userName, String content, LocalDateTime createdAt, LocalDateTime updatedAt) {
    public CommentResponse(Comment comment) {
        this(
                comment.getId(),
                comment.getPostId(),
                comment.getUsername(),
                comment.getContent(),
                comment.getCreatedAt(),
                comment.getUpdatedAt()
        );
    }
}
