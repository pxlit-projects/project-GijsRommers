package be.pxl.services.repository;

import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findPostsByStatus(PostStatus status);
    List<Post> findByContentContainingAndAuthorContainingAndCreatedAtBetweenAndStatus(String content, String author, LocalDateTime startDate, LocalDateTime endDate, PostStatus status);

}
