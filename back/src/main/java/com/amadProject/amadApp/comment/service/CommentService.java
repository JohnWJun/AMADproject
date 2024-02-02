package com.amadProject.amadApp.comment.service;

import com.amadProject.amadApp.comment.entity.Comment;
import com.amadProject.amadApp.comment.repository.CommentRepository;
import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.member.repository.MemberRepository;
import com.amadProject.amadApp.post.entity.Post;
import com.amadProject.amadApp.post.repository.PostRepository;
import com.amadProject.amadApp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final CommentRepository repository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Comment createComment(Comment comment, long postId, long memberId){

        Member findMember = memberRepository.findById(memberId).orElseThrow(()->new RuntimeException("No member found"));

        Post findPost = postRepository.findById(postId).orElseThrow(()->new RuntimeException("No post found"));
        comment.setPost(findPost);
        comment.setMember(findMember);
        return repository.save(comment);
    };

    public Comment updateComment(Comment comment, long commentId){
        Comment findComment = repository.findById(commentId).orElseThrow(()->new RuntimeException("No comment found"));
        Optional.ofNullable(comment.getMention()).ifPresent(mention->findComment.setMention(mention));

        return repository.save(findComment);
    };

    public Comment findComment(long commentId){
        Comment comment = repository.findById(commentId).orElseThrow(()->new RuntimeException("No comment found"));
        return comment;
    };

    public List<Comment> findComments(){

        return null;
    };

    public void deleteComment(long commentId){
        Comment comment = repository.findById(commentId).orElseThrow(()->new RuntimeException("No comment found"));

        repository.delete(comment);
    };
}
