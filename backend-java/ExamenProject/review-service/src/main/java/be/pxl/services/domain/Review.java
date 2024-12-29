package be.pxl.services.domain;


import be.pxl.services.api.dto.request.ReviewRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long postId;
    private String username;
    private String comment;
    private LocalDateTime reviewTime;

    public Review(ReviewRequest reviewDTO) {
        this.postId = reviewDTO.postId();
        this.username = reviewDTO.username();
        this.comment = reviewDTO.comment();
        this.reviewTime = LocalDateTime.now();
    }
}
