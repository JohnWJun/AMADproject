package com.amadProject.amadApp.member.entity;

import com.amadProject.amadApp.post.entity.Post;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @OneToMany(mappedBy = "member")
    private List<Post> posts = new ArrayList<>();

    public void addPost(Post post){
        if (post.getMember() != this) post.setMember(this);
        posts.add(post);
    }


    public Member(String email) {
        this.setEmail(email);
    }
}
