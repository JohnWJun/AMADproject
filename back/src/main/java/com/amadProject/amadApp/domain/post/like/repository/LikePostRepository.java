package com.amadProject.amadApp.domain.post.like.repository;

import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.like.entity.LikePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LikePostRepository extends JpaRepository<LikePost, Long> {

    @Query("SELECT l from LikePost l WHERE l.post = :post AND l.liker = :memberWhoLikes")
    Optional<LikePost> findByPostNMember(Post post, Member memberWhoLikes);
}
