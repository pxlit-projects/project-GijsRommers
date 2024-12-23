package be.pxl.services.api.dto.request;

public record PostRequest(String title, String content, String author, boolean isDraft) {
}
