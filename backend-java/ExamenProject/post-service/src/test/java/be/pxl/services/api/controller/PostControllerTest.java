package be.pxl.services.api.controller;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.services.IPostService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class PostControllerTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Mock
    private IPostService postService;

    @InjectMocks
    private PostController postController;

    @Test
    void getPublishedPosts_ShouldReturnListOfPublishedPosts() {
        LocalDateTime now = LocalDateTime.now();
        List<PostResponse> expectedPosts = List.of(
                new PostResponse(1L, "title", "content", "author", now, "PUBLISHED")
        );
        when(postService.getPublishedPosts()).thenReturn(expectedPosts);

        List<PostResponse> actualPosts = postController.getPublishedPosts();

        assertEquals(expectedPosts, actualPosts);
        verify(postService).getPublishedPosts();
    }

    @Test
    void getPostById_ShouldReturnPostResponse() {
        Long postId = 1L;
        LocalDateTime now = LocalDateTime.now();
        PostResponse expectedPost = new PostResponse(postId, "title", "content", "author", now, "PUBLISHED");
        when(postService.getPostById(postId)).thenReturn(expectedPost);

        PostResponse actualPost = postController.getPostById(postId);

        assertEquals(expectedPost, actualPost);
        verify(postService).getPostById(postId);
    }

    @Test
    void getToReviewedPosts_ShouldReturnListOfPostsToBeReviewed() {
        LocalDateTime now = LocalDateTime.now();
        List<PostResponse> expectedPosts = List.of(
                new PostResponse(1L, "title", "content", "author", now, "REVIEW")
        );
        when(postService.getToBeReviewedPosts()).thenReturn(expectedPosts);

        List<PostResponse> actualPosts = postController.getToReviewedPosts();

        assertEquals(expectedPosts, actualPosts);
        verify(postService).getToBeReviewedPosts();
    }

    @Test
    void createPost_ShouldCallPostServiceCreatePost() {
        PostRequest postRequest = new PostRequest("title", "content", "author", false);

        postController.createPost(postRequest);

        verify(postService).createPost(postRequest);
    }

    @Test
    void updatePost_ShouldCallPostServiceUpdatePost() {
        Long postId = 1L;
        PostRequest postRequest = new PostRequest("title", "content", "author", false);

        postController.updatePost(postId, postRequest);

        verify(postService).updatePost(postId, postRequest);
    }

    @Test
    void getFilteredPosts_ShouldReturnFilteredPosts() {
        String content = "content";
        String author = "author";
        String date = "2023-01-01";
        LocalDateTime parsedDate = LocalDate.parse(date).atStartOfDay();
        List<PostResponse> expectedPosts = List.of(
                new PostResponse(1L, "title", content, author, parsedDate, "PUBLISHED")
        );
        when(postService.getFilteredPosts(content, author, parsedDate)).thenReturn(expectedPosts);

        List<PostResponse> actualPosts = postController.getFilteredPosts(content, author, date);

        assertEquals(expectedPosts, actualPosts);
        verify(postService).getFilteredPosts(content, author, parsedDate);
    }

    @Test
    void getUserPosts_ShouldReturnUserPosts() {
        String username = "user";
        LocalDateTime now = LocalDateTime.now();
        List<PostResponse> expectedPosts = List.of(
                new PostResponse(1L, "title", "content", "author", now, "PUBLISHED")
        );
        when(postService.getUserPosts(username)).thenReturn(expectedPosts);

        List<PostResponse> actualPosts = postController.getUserPosts(username);

        assertEquals(expectedPosts, actualPosts);
        verify(postService).getUserPosts(username);
    }
}