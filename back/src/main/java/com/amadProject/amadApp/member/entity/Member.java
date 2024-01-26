package com.amadProject.amadApp.member.entity;

import com.amadProject.amadApp.amad.entity.Amad;
import com.amadProject.amadApp.post.entity.BibleChapterVerse;
import com.amadProject.amadApp.post.entity.Post;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;


    @Column(nullable = false, updatable = false)
    private String gender;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private int intimacy = 50;

    @Column
    private String statusImg;

    @Column
    private int penaltyPoints = 0;

    @Column
    private boolean isMadePostToday = false;


    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Amad> amads = new ArrayList<>();


    public void addAmad(Amad amad){
        if (amad.getMember() != this) amad.setMember(this);
        amads.add(amad);
    }
    public void addPost(Post post){
        if (post.getMember() != this) post.setMember(this);
        posts.add(post);
    }


    public Member(String email) {
        this.setEmail(email);
    }
}
