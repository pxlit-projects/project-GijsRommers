package be.pxl.services.services;

import be.pxl.services.api.exceptions.NotFoundException;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostStatusListenerService implements IPostStatusListenerService {

    private final PostRepository postRepository;

    @Override
    @RabbitListener(queues = "post-approval-queue")
    public void handlePostApproval(Long postId) {
        log.info("Received approval message for post ID: {}", postId);
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            log.warn("Post not found with Id: {}", postId);
            return;
        }
        Post post = optionalPost.get();
        post.setStatus(PostStatus.PUBLISHED);
        postRepository.save(post);
    }

    @Override
    @RabbitListener(queues = "post-rejection-queue")
    public void handlePostRejection(Long postId) {
        log.info("Received rejection message for post ID: {}", postId);
        Optional<Post> optionalPost = postRepository.findById(postId);
        if (optionalPost.isEmpty()) {
            log.warn("Post not found with Id: {}", postId);
            return;
        }
        Post post = optionalPost.get();
        post.setStatus(PostStatus.REJECTED);
        postRepository.save(post);
    }
}