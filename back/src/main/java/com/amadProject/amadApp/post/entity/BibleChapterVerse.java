package com.amadProject.amadApp.post.entity;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class BibleChapterVerse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bibleChapterVerseId;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    private String bible;

    private int bibleChapter;

    private int bibleVerseFrom;

    private int bibleVerseTo;
}
