package com.amadProject.amadApp.domain.group.entity;

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
public class StudyGroup extends Auditable {

    @Column(nullable = false)
    private String name;

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CREATOR_ID", nullable = false)
    private Member creator;
}
