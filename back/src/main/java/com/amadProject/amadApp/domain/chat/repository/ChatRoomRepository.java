package com.amadProject.amadApp.domain.chat.repository;

import com.amadProject.amadApp.domain.chat.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    @Query("SELECT r FROM ChatRoom r WHERE (r.member1.id = :a AND r.member2.id = :b) OR (r.member1.id = :b AND r.member2.id = :a)")
    Optional<ChatRoom> findByMemberPair(@Param("a") long a, @Param("b") long b);

    @Query("SELECT r FROM ChatRoom r WHERE r.member1.id = :memberId OR r.member2.id = :memberId")
    List<ChatRoom> findAllByMemberId(@Param("memberId") long memberId);
}
