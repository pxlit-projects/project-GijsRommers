package be.pxl.services.services;

import be.pxl.services.api.dto.request.CommentRequest;
import be.pxl.services.api.dto.response.CommentResponse;
import be.pxl.services.api.exceptions.NotFoundException;
import be.pxl.services.domain.Comment;
import be.pxl.services.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CommentServiceTest {

    @Mock
    private CommentRepository commentRepository;

    @InjectMocks
    private CommentService commentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void addComment_ShouldSaveComment() {
        CommentRequest commentRequest = new CommentRequest(1L, "content", "user");
        Comment comment = new Comment(commentRequest);

        commentService.addComment(commentRequest);

        ArgumentCaptor<Comment> commentCaptor = ArgumentCaptor.forClass(Comment.class);
        verify(commentRepository).save(commentCaptor.capture());
        Comment capturedComment = commentCaptor.getValue();

        assertEquals(comment.getPostId(), capturedComment.getPostId());
        assertEquals(comment.getContent(), capturedComment.getContent());
        assertEquals(comment.getUsername(), capturedComment.getUsername());
    }

    @Test
    void getCommentsByPostId_ShouldReturnListOfCommentResponses() {
        Long postId = 1L;
        Comment comment1 = new Comment(new CommentRequest(postId, "content1", "user1"));
        Comment comment2 = new Comment(new CommentRequest(postId, "content2", "user2"));
        when(commentRepository.findByPostId(postId)).thenReturn(List.of(comment1, comment2));

        List<CommentResponse> actualComments = commentService.getCommentsByPostId(postId);

        assertEquals(2, actualComments.size());
        assertEquals("user1", actualComments.get(0).userName());
        assertEquals("user2", actualComments.get(1).userName());
    }

    @Test
    void getCommentsByPostId_ShouldReturnEmptyList_WhenNoCommentsFound() {
        Long postId = 1L;
        when(commentRepository.findByPostId(postId)).thenReturn(List.of());

        List<CommentResponse> actualComments = commentService.getCommentsByPostId(postId);

        assertTrue(actualComments.isEmpty());
    }

    @Test
    void updateComment_ShouldUpdateComment() {
        Long commentId = 1L;
        Comment comment = new Comment(new CommentRequest(1L, "content", "user"));
        when(commentRepository.findById(commentId)).thenReturn(Optional.of(comment));

        commentService.updateComment(commentId, "updated content");

        assertEquals("updated content", comment.getContent());
        verify(commentRepository).save(comment);
    }

    @Test
    void updateComment_ShouldThrowNotFoundException_WhenCommentNotFound() {
        Long commentId = 1L;
        when(commentRepository.findById(commentId)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> commentService.updateComment(commentId, "updated content"));
    }

    @Test
    void deleteComment_ShouldDeleteComment() {
        Long commentId = 1L;

        commentService.deleteComment(commentId);

        verify(commentRepository).deleteById(commentId);
    }
}