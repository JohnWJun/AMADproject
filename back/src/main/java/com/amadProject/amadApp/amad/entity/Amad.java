package com.amadProject.amadApp.amad.entity;

import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.post.entity.Post;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Amad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long amadId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    @Column(nullable = false)
    private String mission;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private boolean isComplete = false;

    @Column(nullable = false)
    private LocalDate createdAt = LocalDate.now();

    @Column
    private LocalDate modifiedAt;


}
