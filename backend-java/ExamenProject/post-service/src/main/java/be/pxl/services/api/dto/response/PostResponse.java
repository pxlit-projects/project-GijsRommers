package be.pxl.services.api.dto.response;

import java.time.LocalDateTime;

public record PostResponse(Long id, String title, String content, String author, LocalDateTime createdDate, boolean isDraft) {
}
