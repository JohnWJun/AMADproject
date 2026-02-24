package com.amadProject.amadApp.domain.follow.repository;

import com.amadProject.amadApp.domain.follow.entity.Follow;
import com.amadProject.amadApp.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    boolean existsByFollowerIdAndFollowingId(Long followerId, Long followingId);

    Optional<Follow> findByFollowerIdAndFollowingId(Long followerId, Long followingId);

    long countByFollowingId(Long followingId);

    long countByFollowerId(Long followerId);

    @Query("SELECT f.following FROM Follow f WHERE f.follower.id = :followerId")
    List<Member> findFollowingMembersByFollowerId(Long followerId);
}
