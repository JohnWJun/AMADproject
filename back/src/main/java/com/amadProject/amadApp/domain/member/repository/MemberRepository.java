package com.amadProject.amadApp.domain.member.repository;

import com.amadProject.amadApp.domain.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member,Long> {
    Optional<Member> findByEmail(String email);

    @Query("SELECT m from Member m WHERE m.penaltyPoints >= :points")
    List<Member> findAllByPenaltyPoints(int points);

    @Query("SELECT m from Member m WHERE m.isMadePostToday = false")
    List<Member> findAllByIsMadePostToday();
    @Query("SELECT m from Member m WHERE m.isMadePostToday = true")
    List<Member> findAllByMadePostToday();

    @Query(value = "SELECT m FROM Member m WHERE m.id != :myId " +
                   "AND m.id NOT IN (SELECT f.following.id FROM Follow f WHERE f.follower.id = :myId)",
           countQuery = "SELECT count(m) FROM Member m WHERE m.id != :myId " +
                        "AND m.id NOT IN (SELECT f.following.id FROM Follow f WHERE f.follower.id = :myId)")
    Page<Member> findRecommendedExcludingFollowed(@Param("myId") Long myId, Pageable pageable);
}
