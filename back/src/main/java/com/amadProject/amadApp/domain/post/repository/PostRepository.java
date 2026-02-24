package com.amadProject.amadApp.domain.post.repository;

import com.amadProject.amadApp.domain.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = "SELECT p FROM Post p where p.member.email = :email AND p.publishedDate >= :startDate AND p.publishedDate < :endDate")
    Optional<Post> findByEmailNDate(String email, LocalDateTime startDate, LocalDateTime endDate);

    @Query(value = "SELECT p FROM Post p where p.member.email = :email AND (p.publishedDate < :startDate OR p.publishedDate >= :endDate) ORDER BY p.publishedDate DESC",
           countQuery = "SELECT COUNT(p) FROM Post p where p.member.email = :email AND (p.publishedDate < :startDate OR p.publishedDate >= :endDate)")
    Page<Post> findAllByEmailExcToday(LocalDateTime startDate, LocalDateTime endDate, String email, Pageable pageable);

    @Query(value = "SELECT p FROM Post p where p.publishedDate >= :startDate AND p.publishedDate < :endDate ORDER BY p.publishedDate DESC",
           countQuery = "SELECT COUNT(p) FROM Post p where p.publishedDate >= :startDate AND p.publishedDate < :endDate")
    Page<Post> findAllByWrittenDate(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);

    @Query(value = "SELECT p FROM Post p where p.member.id = :memberId AND p.publishedDate >= :startDate AND p.publishedDate < :endDate")
    Optional<Post> findByMemberIdNDate(long memberId, LocalDateTime startDate, LocalDateTime endDate);

    @Query(value = "SELECT p FROM Post p LEFT JOIN p.amad a WHERE p.title LIKE %:keyword% OR p.content_1 LIKE %:keyword% OR p.content_2 LIKE %:keyword% OR p.content_3 LIKE %:keyword% OR p.content_4 LIKE %:keyword% OR p.content_5 LIKE %:keyword% OR a.mission LIKE %:keyword% OR p.member.nickname LIKE %:keyword% OR p.member.email LIKE %:keyword%")
    Page<Post> findAllByKeyword(String keyword, Pageable pageable);

    @Query(value = "SELECT p FROM Post p LEFT JOIN p.amad a WHERE p.title LIKE %:keyword% OR p.content_1 LIKE %:keyword% OR p.content_2 LIKE %:keyword% OR p.content_3 LIKE %:keyword% OR p.content_4 LIKE %:keyword% OR p.content_5 LIKE %:keyword% OR a.mission LIKE %:keyword% OR p.member.nickname LIKE %:keyword% OR p.member.email LIKE %:keyword% ORDER BY SIZE(p.whoLikesMyPost) DESC")
    Page<Post> findAllByKeywordSortedByLikes(String keyword, Pageable pageable);

    @Query(value = "SELECT p FROM Post p LEFT JOIN p.amad a WHERE (p.title LIKE %:keyword% OR p.content_1 LIKE %:keyword% OR p.content_2 LIKE %:keyword% OR p.content_3 LIKE %:keyword% OR p.content_4 LIKE %:keyword% OR p.content_5 LIKE %:keyword% OR a.mission LIKE %:keyword% OR p.member.nickname LIKE %:keyword% OR p.member.email LIKE %:keyword%) AND p.member.id IN (SELECT f.following.id FROM Follow f WHERE f.follower.id = :myId)",
           countQuery = "SELECT COUNT(p) FROM Post p LEFT JOIN p.amad a WHERE (p.title LIKE %:keyword% OR p.content_1 LIKE %:keyword% OR p.content_2 LIKE %:keyword% OR p.content_3 LIKE %:keyword% OR p.content_4 LIKE %:keyword% OR p.content_5 LIKE %:keyword% OR a.mission LIKE %:keyword% OR p.member.nickname LIKE %:keyword% OR p.member.email LIKE %:keyword%) AND p.member.id IN (SELECT f.following.id FROM Follow f WHERE f.follower.id = :myId)")
    Page<Post> findAllByKeywordAndFollowing(@Param("keyword") String keyword, @Param("myId") Long myId, Pageable pageable);

    @Query(value = "SELECT p FROM Post p LEFT JOIN p.amad a WHERE (p.title LIKE %:keyword% OR p.content_1 LIKE %:keyword% OR p.content_2 LIKE %:keyword% OR p.content_3 LIKE %:keyword% OR p.content_4 LIKE %:keyword% OR p.content_5 LIKE %:keyword% OR a.mission LIKE %:keyword% OR p.member.nickname LIKE %:keyword% OR p.member.email LIKE %:keyword%) AND p.member.id IN (SELECT f.following.id FROM Follow f WHERE f.follower.id = :myId) ORDER BY SIZE(p.whoLikesMyPost) DESC",
           countQuery = "SELECT COUNT(p) FROM Post p LEFT JOIN p.amad a WHERE (p.title LIKE %:keyword% OR p.content_1 LIKE %:keyword% OR p.content_2 LIKE %:keyword% OR p.content_3 LIKE %:keyword% OR p.content_4 LIKE %:keyword% OR p.content_5 LIKE %:keyword% OR a.mission LIKE %:keyword% OR p.member.nickname LIKE %:keyword% OR p.member.email LIKE %:keyword%) AND p.member.id IN (SELECT f.following.id FROM Follow f WHERE f.follower.id = :myId)")
    Page<Post> findAllByKeywordAndFollowingSortedByLikes(@Param("keyword") String keyword, @Param("myId") Long myId, Pageable pageable);

}
