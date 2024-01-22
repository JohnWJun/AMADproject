package com.amadProject.amadApp.post.entity;

import com.amadProject.amadApp.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@Setter
@NoArgsConstructor
@Getter
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postId;

    private String title;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private LocalDate publishedAt = LocalDate.now();

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "bibleChapterVerse_id")
    private BibleChapterVerse bibleChapterVerse;

    private String content_1;

    private String content_2;

    private String content_3;

    private String content_4;

    private String content_5;



}
