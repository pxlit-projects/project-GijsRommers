package be.pxl.services.services;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.api.exceptions.NotFoundException;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService implements IPostService {

    private final PostRepository postRepository;

    @Override
    public void createPost(PostRequest postRequest) {
        log.info("Creating post with title: {}", postRequest.title());
        Post post = new Post();
        post.setTitle(postRequest.title());
        post.setContent(postRequest.content());
        post.setAuthor(postRequest.author());
        post.setCreatedAt(LocalDateTime.now());
        post.setStatus(postRequest.isDraft() ? PostStatus.DRAFT : PostStatus.PENDING_APPROVAL);
        postRepository.save(post);
        log.info("Post created with ID: {}", post.getId());
    }

    @Override
    public void updatePost(Long id, PostRequest postRequest) {
        log.info("Updating post with ID: {}", id);
        Optional<Post> optionalPost = postRepository.findById(id);
        if (optionalPost.isPresent()) {
            Post post = optionalPost.get();
            post.setTitle(postRequest.title());
            post.setContent(postRequest.content());
            post.setAuthor(postRequest.author());
            post.setStatus(postRequest.isDraft() ? PostStatus.DRAFT : PostStatus.PENDING_APPROVAL);
            postRepository.save(post);
            log.info("Post updated with ID: {}", post.getId());
        } else {
            log.error("Post not found with ID: {}", id);
            throw new NotFoundException("Post not found with id " + id);
        }
    }

    @Override
    public List<PostResponse> getPublishedPosts() {
        log.info("Fetching published posts");
        return postRepository.findPostsByStatus(PostStatus.PUBLISHED)
                .stream()
                .map(PostResponse::new)
                .toList();
    }

    @Override
    public List<PostResponse> getFilteredPosts(String content, String author, LocalDateTime startDate, LocalDateTime endDate) {
        log.info("Fetching filtered posts with content: {}, author: {}, startDate: {}, endDate: {}", content, author, startDate, endDate);
        return postRepository.findByContentContainingAndAuthorContainingAndCreatedAtBetweenAndStatus(content, author, startDate, endDate, PostStatus.PUBLISHED)
                .stream()
                .map(PostResponse::new)
                .toList();
    }
}