package be.pxl.services.services;

import be.pxl.services.api.dto.response.PostResponse;
import be.pxl.services.client.PostClient;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewService implements IReviewService {

    private final PostClient postServiceClient;



    @Override
    public List<PostResponse> getToReviewedPosts() {
        log.info("Fetching posts to be reviewed");
        return postServiceClient.getToBeReviewedPosts();
    }
}
