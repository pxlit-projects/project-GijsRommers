package be.pxl.services.services;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.api.dto.response.PostResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface IPostService {
    void createPost(PostRequest post);
    void updatePost(Long id, PostRequest post);
    List<PostResponse> getPublishedPosts();
    List<PostResponse> getFilteredPosts(String content, String author, LocalDateTime startDate, LocalDateTime endDate);
    List<PostResponse> getToBeReviewedPosts();
    PostResponse getPostById(Long id);
    List<PostResponse> getUserPosts(String username);
}
