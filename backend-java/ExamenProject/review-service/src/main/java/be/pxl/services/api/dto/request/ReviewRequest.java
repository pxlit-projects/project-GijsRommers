package be.pxl.services.api.dto.request;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ReviewRequest(
        @NotNull Long postId,
        @NotBlank String username,
        @NotBlank String comment
) {}
