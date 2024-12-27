    package be.pxl.services.client;

    import be.pxl.services.api.dto.response.PostResponse;
    import org.springframework.cloud.openfeign.FeignClient;
    import org.springframework.web.bind.annotation.GetMapping;

    import java.util.List;

    @FeignClient(name = "post-service")
    public interface PostClient {
        @GetMapping("/review")  // This should match ReviewController's path
        List<PostResponse> getToBeReviewedPosts();
    }
