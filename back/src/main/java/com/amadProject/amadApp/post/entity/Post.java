package com.amadProject.amadApp.post.entity;

import com.amadProject.amadApp.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.w3c.dom.stylesheets.LinkStyle;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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

    @OneToMany(mappedBy = "post",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<BibleChapterVerse> bibleChapterVerses = new ArrayList<>();

    private String content_1;

    private String content_2;

    private String content_3;

    private String content_4;

    private String content_5;


    public void addBible(BibleChapterVerse bibleChapterVerse){
        if (bibleChapterVerse.getPost() != this) bibleChapterVerse.setPost(this);
        bibleChapterVerses.add(bibleChapterVerse);
    }

}
