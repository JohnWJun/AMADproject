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
public class ChatRoom extends Auditable {

    @ManyToOne
    @JoinColumn(name = "MEMBER1_ID", nullable = false)
    private Member member1;

    @ManyToOne
    @JoinColumn(name = "MEMBER2_ID", nullable = false)
    private Member member2;
}
