package be.pxl.services.services;

import be.pxl.services.api.dto.request.PostRequest;

public interface IPostService {
    void createPost(PostRequest post);

}
