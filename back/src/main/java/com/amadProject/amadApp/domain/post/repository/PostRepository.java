package com.amadProject.amadApp.domain.post.repository;

import com.amadProject.amadApp.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = "SELECT p FROM Post p where p.member.email = :email AND p.publishedDate = :date")
    Optional<Post> findByEmailNDate(String email, LocalDate date);

    @Query(value = "SELECT p FROM Post p where p.member.email = :email AND  p.publishedDate != :date")
    Page<Post> findAllByEmailExcToday(LocalDate date, String email, Pageable pageable);

    @Query(value = "SELECT p FROM Post p where p.publishedDate = :writtenDate")
    Page<Post> findAllByWrittenDate(LocalDate writtenDate,  Pageable pageable);
    @Query(value = "SELECT p FROM Post p where p.member.id =:memberId AND p.publishedDate = :date")
    Optional<Post> findByMemberIdNDate(long memberId, LocalDate date);

    @Query(value = "SELECT p FROM Post p where p.content_1 LIKE %:keyword% OR p.content_2 LIKE %:keyword% OR p.content_3 LIKE %:keyword% OR p.content_4 LIKE %:keyword% OR p.content_5 LIKE %:keyword% OR p.amad LIKE %:keyword% OR p.member.nickname LIKE %:keyword% OR p.member.email LIKE %:keyword%")
    Page<Post> findAllByKeyword( String keyword, Pageable createdAt);

}
