package be.pxl.services.api.dto.request;


import java.time.LocalDateTime;

public record ReviewDTO(
        Long postId,
        String username,
        String comment
) {
}
