package be.pxl.services.services;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService {

    private final PostRepository postRepository;

    @Override
    public void createPost(PostRequest postRequest) {
        Post post = new Post();
        post.setTitle(postRequest.title());
        post.setContent(postRequest.content());
        post.setAuthor(postRequest.author());
        post.setCreatedAt(LocalDateTime.now());
        post.setStatus(postRequest.isDraft() ? PostStatus.DRAFT : PostStatus.PENDING_APPROVAL );
        postRepository.save(post);
    }
}