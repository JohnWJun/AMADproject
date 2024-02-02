package com.amadProject.amadApp.comment.repository;

import com.amadProject.amadApp.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
