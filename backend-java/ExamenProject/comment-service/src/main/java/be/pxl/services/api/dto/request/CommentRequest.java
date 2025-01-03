package be.pxl.services.api.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentRequest(
        @NotNull
        Long postId,
        @NotBlank
        @NotNull
        String content,
        @NotBlank
        @NotNull
        String userName
) {
}
