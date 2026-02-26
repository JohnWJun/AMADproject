package com.amadProject.amadApp.domain.group.entity;

import com.amadProject.amadApp.common.audit.Auditable;
import com.amadProject.amadApp.domain.group.entity.enums.GroupRole;
import com.amadProject.amadApp.domain.group.entity.enums.MemberStatus;
import com.amadProject.amadApp.domain.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"STUDY_GROUP_ID", "MEMBER_ID"}))
public class GroupMember extends Auditable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STUDY_GROUP_ID", nullable = false)
    private StudyGroup studyGroup;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID", nullable = false)
    private Member member;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus status;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GroupRole role;
}
