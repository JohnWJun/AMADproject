package com.amadProject.amadApp.domain.ai.entity;

import com.amadProject.amadApp.common.audit.Auditable;
import com.amadProject.amadApp.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ai_chat_message", indexes = {
        @Index(name = "idx_ai_chat_member_created", columnList = "MEMBER_ID, created_at")
})
@Getter
@Setter
@NoArgsConstructor
public class AiChatMessage extends Auditable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 16)
    private Role role;

    /**
     * TEXT column: supports long AI responses without truncation.
     */
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    public enum Role {
        USER, ASSISTANT
    }
}
