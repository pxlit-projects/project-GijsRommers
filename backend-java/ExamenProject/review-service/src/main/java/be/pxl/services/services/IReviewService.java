package be.pxl.services.services;

import be.pxl.services.api.dto.response.PostResponse;

import java.util.List;

public interface IReviewService {
    List<PostResponse> getToReviewedPosts();
}