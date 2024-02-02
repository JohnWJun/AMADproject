package com.amadProject.amadApp.comment.entity;

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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @Column(nullable = false)
    private String mention;

    @Column(nullable = false)
    private LocalDate createdAt = LocalDate.now();

    @Column(nullable = false)
    private LocalDate modifiedAt = LocalDate.now();
}
