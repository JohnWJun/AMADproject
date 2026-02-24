package com.amadProject.amadApp.domain.comment.repository;

import com.amadProject.amadApp.domain.comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query(value = "select c FROM Comment c WHERE c.post.id = :postId AND c.parent IS NULL ORDER BY c.createdAt ASC",
           countQuery = "select count(c) FROM Comment c WHERE c.post.id = :postId AND c.parent IS NULL")
    Page<Comment> findAllByPostId(long postId, Pageable pageable);

    boolean existsByParentId(Long parentId);
}
