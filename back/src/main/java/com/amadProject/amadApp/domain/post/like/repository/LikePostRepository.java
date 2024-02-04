package com.amadProject.amadApp.domain.post.like.repository;

import com.amadProject.amadApp.domain.post.like.entity.LikePost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikePostRepository extends JpaRepository<LikePost, Long> {
}
