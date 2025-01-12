package be.pxl.services.api.controller;

import be.pxl.services.api.dto.request.CommentRequest;
import be.pxl.services.api.dto.response.CommentResponse;
import be.pxl.services.services.ICommentService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class CommentControllerTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private CommentController commentController;

    @Autowired
    private ICommentService commentService;

    @BeforeEach
    void setup() {
        commentService = mock(ICommentService.class);
        commentController = new CommentController(commentService);
    }

    @Test
    void addComment_ShouldAddComment() {
        CommentRequest commentRequest = new CommentRequest(1L, "user", "content");

        commentController.addComment(commentRequest);

        verify(commentService).addComment(commentRequest);
    }

    @Test
    void getCommentsByPostId_ShouldReturnListOfCommentResponses() {
        Long postId = 1L;
        List<CommentResponse> expectedComments = List.of(
                new CommentResponse(1L, postId, "user1", "content1", LocalDateTime.now(), LocalDateTime.now()),
                new CommentResponse(2L, postId, "user2", "content2", LocalDateTime.now(), LocalDateTime.now())
        );
        when(commentService.getCommentsByPostId(postId)).thenReturn(expectedComments);

        List<CommentResponse> actualComments = commentController.getCommentsByPostId(postId);

        assertEquals(expectedComments, actualComments);
        verify(commentService).getCommentsByPostId(postId);
    }

    @Test
    void updateComment_ShouldUpdateComment() {
        Long commentId = 1L;
        CommentRequest commentRequest = new CommentRequest(1L, "user", "updated content");

        commentController.updateComment(commentId, commentRequest);

        verify(commentService).updateComment(commentId, commentRequest.content());
    }

    @Test
    void deleteComment_ShouldDeleteComment() {
        Long commentId = 1L;

        commentController.deleteComment(commentId);

        verify(commentService).deleteComment(commentId);
    }
}