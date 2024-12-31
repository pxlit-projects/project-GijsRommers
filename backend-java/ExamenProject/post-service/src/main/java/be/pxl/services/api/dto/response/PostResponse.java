package be.pxl.services.api.dto.response;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;

import java.time.LocalDateTime;

public record PostResponse(Long id, String title, String content, String author, LocalDateTime createdDate, String status) {
    public PostResponse(Post post) {
        this(post.getId(), post.getTitle(), post.getContent(), post.getAuthor(), post.getCreatedAt(), post.getStatus().toString());
    }
}
