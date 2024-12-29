package be.pxl.services.services;

public interface IPostStatusListenerService {
    void handlePostApproval(Long postId);
    void handlePostRejection(Long postId);
}
