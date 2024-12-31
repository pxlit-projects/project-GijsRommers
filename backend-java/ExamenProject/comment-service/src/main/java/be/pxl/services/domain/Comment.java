package be.pxl.services.domain;

import be.pxl.services.api.dto.request.CommentRequest;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long postId;
    private String username;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Comment(CommentRequest commentRequest) {
        this.postId = commentRequest.postId();
        this.username = commentRequest.userName();
        this.content = commentRequest.content();
        this.createdAt = LocalDateTime.now();
    }
}
