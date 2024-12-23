package be.pxl.services.services;

import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.client.PostClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService implements IReviewService {

    private final PostClient postServiceClient;



    @Override
    public List<PostResponse> getToReviewedPosts() {
        return postServiceClient.getToBeReviewedPosts();
    }
}
