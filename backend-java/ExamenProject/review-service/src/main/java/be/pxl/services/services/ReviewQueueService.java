package be.pxl.services.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReviewQueueService implements IReviewQueueService {

    private final RabbitTemplate rabbitTemplate;


    @Override
    public void sendApprovalMessage(String postId) {
        log.info("Sending approval message for post ID: {}", postId);
        rabbitTemplate.convertAndSend("post-approval-queue", postId);
    }

    @Override
    public void sendRejectionMessage(String postId) {
        log.info("Sending rejection message for post ID: {}", postId);
        rabbitTemplate.convertAndSend("post-rejection-queue", postId);
    }
}
