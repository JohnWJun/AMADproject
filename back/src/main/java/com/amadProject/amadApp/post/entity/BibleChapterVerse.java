package com.amadProject.amadApp.post.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Setter
@Getter
@Entity
public class BibleChapterVerse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bibleChapterVerseId;

    @OneToOne(mappedBy = "bibleChapterVerse")
    private Post post;

    private String bible;

    private int bibleChapter;

    private int bibleVerseFrom;

    private int bibleVerseTo;
}
