package com.amadProject.amadApp.domain.post.entity;

import com.amadProject.amadApp.common.entity.BaseEntity;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class BibleChapterVerse extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    private String bible;

    private int bibleChapter;

    private int bibleVerseFrom;

    private int bibleVerseTo;
}
