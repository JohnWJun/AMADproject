package com.amadProject.amadApp.domain.follow.entity;

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
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"FOLLOWER_ID", "FOLLOWING_ID"}))
public class Follow extends Auditable {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWER_ID", nullable = false)
    private Member follower;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "FOLLOWING_ID", nullable = false)
    private Member following;
}
