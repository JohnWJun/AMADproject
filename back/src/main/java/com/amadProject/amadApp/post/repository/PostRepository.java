package com.amadProject.amadApp.post.repository;

import com.amadProject.amadApp.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = "SELECT p FROM Post p where p.member.email = :email AND p.publishedAt = :date")
    Optional<Post> findByEmailNDate(String email, LocalDate date);
}
