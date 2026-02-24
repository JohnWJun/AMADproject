package com.amadProject.amadApp.domain.member.entity;

import com.amadProject.amadApp.common.audit.Auditable;
import com.amadProject.amadApp.domain.amad.entity.Amad;
import com.amadProject.amadApp.domain.comment.entity.Comment;
import com.amadProject.amadApp.domain.follow.entity.Follow;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.like.entity.LikePost;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {


    @Column(nullable = false, updatable = false, unique = true)
    private String email;


//    @Column(nullable = false, updatable = false)
//    private String gender;

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


    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Amad> amads = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "member",cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<LikePost> postsILike = new ArrayList<>();

    @OneToMany(mappedBy = "follower", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Follow> followings = new ArrayList<>();

    @OneToMany(mappedBy = "following", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Follow> followers = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    public void addPostsILike(LikePost likePost){
        if (likePost.getMember() != this) likePost.setMember(this);
        postsILike.add(likePost);
    }
    public void addAmad(Amad amad){
        if (amad.getMember() != this) amad.setMember(this);
        amads.add(amad);
    }
    public void addPost(Post post){
        if (post.getMember() != this) post.setMember(this);
        posts.add(post);
    }


}
