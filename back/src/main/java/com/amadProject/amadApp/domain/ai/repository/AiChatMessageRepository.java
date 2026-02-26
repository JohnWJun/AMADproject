package com.amadProject.amadApp.domain.ai.repository;

import com.amadProject.amadApp.domain.ai.entity.AiChatMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AiChatMessageRepository extends JpaRepository<AiChatMessage, Long> {

    /**
     * Fetch the most recent N messages for a member, ordered oldest-first
     * so the chat history is rendered chronologically in the UI.
     */
    @Query("SELECT m FROM AiChatMessage m WHERE m.member.id = :memberId " +
           "ORDER BY m.createdAt DESC")
    List<AiChatMessage> findRecentByMemberId(@Param("memberId") Long memberId, Pageable pageable);
}
