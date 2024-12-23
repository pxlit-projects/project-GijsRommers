package be.pxl.services.services;

import be.pxl.services.api.dto.request.PostRequest;
import be.pxl.services.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService {

    private final PostRepository postRepository;

    @Override
    public void createPost(PostRequest post) {
        // Implementation here
    }
}