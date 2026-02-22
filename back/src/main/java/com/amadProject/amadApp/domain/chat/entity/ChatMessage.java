package com.amadProject.amadApp.domain.chat.entity;

import com.amadProject.amadApp.common.audit.Auditable;
import com.amadProject.amadApp.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage extends Auditable {

    @ManyToOne
    @JoinColumn(name = "CHAT_ROOM_ID", nullable = false)
    private ChatRoom chatRoom;

    @ManyToOne
    @JoinColumn(name = "SENDER_ID", nullable = false)
    private Member sender;

    @Column(nullable = false)
    private String content;
}
