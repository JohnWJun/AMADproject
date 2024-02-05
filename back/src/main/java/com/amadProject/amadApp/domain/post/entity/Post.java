package com.amadProject.amadApp.domain.post.entity;

import com.amadProject.amadApp.common.audit.Auditable;
import com.amadProject.amadApp.domain.amad.entity.Amad;
import com.amadProject.amadApp.domain.comment.entity.Comment;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.post.like.entity.LikePost;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post extends Auditable {

    private String title;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @JoinColumn(nullable = false)
    private LocalDate publishedDate= LocalDate.now();

    @OneToMany(mappedBy = "post",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<BibleChapterVerse> bibleChapterVerses = new ArrayList<>();

    @OneToMany(mappedBy = "post",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<LikePost> whoLikesMyPost = new ArrayList<>();

    @OneToOne(mappedBy = "post")
    private Amad amad;

    @Column(nullable = false)
    private String content_1;

    @Column(nullable = false)
    private String content_2;

    @Column(nullable = false)
    private String content_3;

    @Column(nullable = false)
    private String content_4;

    @Column(nullable = false)
    private String content_5;

    @OneToMany(mappedBy = "post",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();


    public void addBible(BibleChapterVerse bibleChapterVerse){
        if (bibleChapterVerse.getPost() != this) bibleChapterVerse.setPost(this);
        bibleChapterVerses.add(bibleChapterVerse);
    }

    public void addLikePost(LikePost likePost){
        if (likePost.getPost() != this) likePost.setPost(this);
        whoLikesMyPost.add(likePost);
    }

}
