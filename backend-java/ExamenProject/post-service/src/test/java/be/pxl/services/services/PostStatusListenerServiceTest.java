package be.pxl.services.services;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.repository.PostRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.RabbitMQContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@Testcontainers
@ActiveProfiles("test")
class PostStatusListenerServiceTest {

    @Container
    static RabbitMQContainer rabbitMQ = new RabbitMQContainer("rabbitmq:3.12-management");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.rabbitmq.host", rabbitMQ::getHost);
        registry.add("spring.rabbitmq.port", rabbitMQ::getAmqpPort);
        registry.add("spring.rabbitmq.username", rabbitMQ::getAdminUsername);
        registry.add("spring.rabbitmq.password", rabbitMQ::getAdminPassword);
    }

    @Mock
    private PostRepository postRepository;

    @InjectMocks
    private PostStatusListenerService postStatusListenerService;

    @Test
    void handlePostApproval_ExistingPost_ShouldSetStatusToPublished() {
        Long postId = 1L;
        Post post = new Post();
        post.setId(postId);
        post.setStatus(PostStatus.PENDING_APPROVAL);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        postStatusListenerService.handlePostApproval(postId);

        verify(postRepository).save(post);
        assertEquals(PostStatus.PUBLISHED, post.getStatus());
    }

    @Test
    void handlePostApproval_NonExistingPost_ShouldLogWarning() {
        Long postId = 1L;
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        postStatusListenerService.handlePostApproval(postId);

        verify(postRepository, never()).save(any(Post.class));
    }

    @Test
    void handlePostRejection_ExistingPost_ShouldSetStatusToRejected() {
        Long postId = 1L;
        Post post = new Post();
        post.setId(postId);
        post.setStatus(PostStatus.PENDING_APPROVAL);
        when(postRepository.findById(postId)).thenReturn(Optional.of(post));

        postStatusListenerService.handlePostRejection(postId);

        verify(postRepository).save(post);
        assertEquals(PostStatus.REJECTED, post.getStatus());
    }

    @Test
    void handlePostRejection_NonExistingPost_ShouldLogWarning() {
        Long postId = 1L;
        when(postRepository.findById(postId)).thenReturn(Optional.empty());

        postStatusListenerService.handlePostRejection(postId);

        verify(postRepository, never()).save(any(Post.class));
    }
}