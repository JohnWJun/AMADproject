package com.amadProject.amadApp.domain.comment.entity;

import com.amadProject.amadApp.common.audit.Auditable;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Comment extends Auditable {

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "POST_ID")
    private Post post;

    @Column(nullable = false)
    private String mention;

    @Column(nullable = false)
    private boolean deleted = false;

    @ManyToOne
    @JoinColumn(name = "PARENT_ID")
    private Comment parent;

    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY,
               cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("createdAt ASC")
    private List<Comment> children = new ArrayList<>();
}
