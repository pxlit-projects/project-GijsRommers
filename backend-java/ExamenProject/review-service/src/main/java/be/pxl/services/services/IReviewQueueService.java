package be.pxl.services.services;

public interface IReviewQueueService {
    void sendApprovalMessage(String postId);
    void sendRejectionMessage(String postId);
}
