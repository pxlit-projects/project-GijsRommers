package be.pxl.services.services;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.api.exceptions.NotFoundException;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@Testcontainers
@ActiveProfiles("test")
class PostServiceTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine");

    @DynamicPropertySource
    static void configureProperties(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
    }

    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @BeforeEach
    void cleanup() {
        postRepository.deleteAll();
    }

    @Test
    void updatePost_WithExistingId_ShouldUpdatePost() {
        Post post = new Post();
        post.setTitle("Original Title");
        post.setContent("Original Content");
        post.setAuthor("originalAuthor");
        post.setStatus(PostStatus.DRAFT);
        post.setCreatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);

        PostRequest updateRequest = new PostRequest("Updated Title", "Updated Content", "updatedAuthor", false);

        postService.updatePost(savedPost.getId(), updateRequest);

        Post updatedPost = postRepository.findById(savedPost.getId()).orElseThrow();
        assertEquals("Updated Title", updatedPost.getTitle());
        assertEquals("Updated Content", updatedPost.getContent());
        assertEquals("updatedAuthor", updatedPost.getAuthor());
        assertEquals(PostStatus.PENDING_APPROVAL, updatedPost.getStatus());
    }

    @Test
    void updatePost_WithNonExistingId_ShouldThrowNotFoundException() {
        PostRequest updateRequest = new PostRequest("Title", "Content", "author", false);

        assertThrows(NotFoundException.class, () -> postService.updatePost(999L, updateRequest));
    }

    @Test
    void getPublishedPosts_ShouldReturnOnlyPublishedPosts() {
        createSamplePost(PostStatus.PUBLISHED);
        createSamplePost(PostStatus.DRAFT);
        createSamplePost(PostStatus.PUBLISHED);

        List<PostResponse> publishedPosts = postService.getPublishedPosts();

        assertEquals(2, publishedPosts.size());
        publishedPosts.forEach(post -> assertEquals(PostStatus.PUBLISHED.toString(), post.status()));
    }

    @Test
    void getFilteredPosts_ShouldReturnMatchingPublishedPosts() {
        LocalDateTime testDate = LocalDateTime.now().minusDays(1);
        createSamplePost(PostStatus.PUBLISHED, "Test content", "authorA", testDate);
        createSamplePost(PostStatus.PUBLISHED, "Different", "authorB", testDate);
        createSamplePost(PostStatus.DRAFT, "Test content", "authorA", testDate);

        List<PostResponse> filteredPosts = postService.getFilteredPosts("Test", "authorA", testDate.minusDays(1));

        assertEquals(1, filteredPosts.size());
        PostResponse filteredPost = filteredPosts.getFirst();
        assertTrue(filteredPost.content().contains("Test"));
        assertEquals("authorA", filteredPost.author());
    }

    @Test
    void getToBeReviewedPosts_ShouldReturnOnlyPendingApprovalPosts() {
        createSamplePost(PostStatus.PENDING_APPROVAL);
        createSamplePost(PostStatus.PUBLISHED);
        createSamplePost(PostStatus.PENDING_APPROVAL);

        List<PostResponse> pendingPosts = postService.getToBeReviewedPosts();

        assertEquals(2, pendingPosts.size());
        pendingPosts.forEach(post -> assertEquals(PostStatus.PENDING_APPROVAL.toString(), post.status()));
    }

    @Test
    void getPostById_WithExistingId_ShouldReturnPost() {
        Post post = createSamplePost(PostStatus.PUBLISHED);

        PostResponse response = postService.getPostById(post.getId());

        assertNotNull(response);
        assertEquals(post.getId(), response.id());
        assertEquals(post.getTitle(), response.title());
    }

    @Test
    void getPostById_WithNonExistingId_ShouldThrowNotFoundException() {
        assertThrows(NotFoundException.class, () -> postService.getPostById(999L));
    }

    @Test
    void getUserPosts_ShouldReturnUserSpecificPosts() {
        createSamplePost(PostStatus.PUBLISHED, "Content", "userA", LocalDateTime.now());
        createSamplePost(PostStatus.DRAFT, "Content", "userA", LocalDateTime.now());
        createSamplePost(PostStatus.PUBLISHED, "Content", "userB", LocalDateTime.now());

        List<PostResponse> userPosts = postService.getUserPosts("userA");

        assertEquals(2, userPosts.size());
        userPosts.forEach(post -> assertEquals("userA", post.author()));
    }

    private Post createSamplePost(PostStatus status) {
        return createSamplePost(status, "Test Content", "testAuthor", LocalDateTime.now());
    }

    private Post createSamplePost(PostStatus status, String content, String author, LocalDateTime createdAt) {
        Post post = new Post();
        post.setTitle("Test Title");
        post.setContent(content);
        post.setAuthor(author);
        post.setStatus(status);
        post.setCreatedAt(createdAt);
        return postRepository.save(post);
    }

    @Test
    void createPost_WithDraftStatus_ShouldSavePostAsDraft() {
        PostRequest request = new PostRequest("Test Title", "Test Content", "testAuthor", true);

        postService.createPost(request);

        List<Post> posts = postRepository.findAll();
        assertEquals(1, posts.size());
        Post savedPost = posts.getFirst();
        assertEquals(PostStatus.DRAFT, savedPost.getStatus());
    }

    @Test
    void createPost_WithoutDraftStatus_ShouldSavePostAsPendingApproval() {
        PostRequest request = new PostRequest("Test Title", "Test Content", "testAuthor", false);

        postService.createPost(request);

        List<Post> posts = postRepository.findAll();
        assertEquals(1, posts.size());
        assertEquals(PostStatus.PENDING_APPROVAL, posts.getFirst().getStatus());
    }

    @Test
    void updatePost_WithDraftStatus_ShouldUpdatePostAsDraft() {
        Post post = new Post();
        post.setTitle("Original Title");
        post.setContent("Original Content");
        post.setAuthor("originalAuthor");
        post.setStatus(PostStatus.PENDING_APPROVAL);
        post.setCreatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);

        PostRequest updateRequest = new PostRequest("Updated Title", "Updated Content", "updatedAuthor", true);

        postService.updatePost(savedPost.getId(), updateRequest);

        Post updatedPost = postRepository.findById(savedPost.getId()).orElseThrow();
        assertEquals(PostStatus.DRAFT, updatedPost.getStatus());
    }

    @Test
    void updatePost_WithoutDraftStatus_ShouldUpdatePostAsPendingApproval() {
        Post post = new Post();
        post.setTitle("Original Title");
        post.setContent("Original Content");
        post.setAuthor("originalAuthor");
        post.setStatus(PostStatus.DRAFT);
        post.setCreatedAt(LocalDateTime.now());
        Post savedPost = postRepository.save(post);

        PostRequest updateRequest = new PostRequest("Updated Title", "Updated Content", "updatedAuthor", false);

        postService.updatePost(savedPost.getId(), updateRequest);

        Post updatedPost = postRepository.findById(savedPost.getId()).orElseThrow();
        assertEquals(PostStatus.PENDING_APPROVAL, updatedPost.getStatus());
    }
}