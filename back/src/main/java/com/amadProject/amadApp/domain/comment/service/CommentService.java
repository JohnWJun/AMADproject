package com.amadProject.amadApp.domain.comment.service;

import com.amadProject.amadApp.domain.comment.entity.Comment;
import com.amadProject.amadApp.domain.comment.repository.CommentRepository;
import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public Comment createComment(Comment comment, long postId, long memberId, Long parentId){

        Member findMember = memberRepository.findById(memberId).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        Post findPost = postRepository.findById(postId).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        comment.setPost(findPost);
        comment.setMember(findMember);
        if (parentId != null) {
            Comment parent = repository.findById(parentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
            comment.setParent(parent);
        }
        return repository.save(comment);
    };

    public Comment updateComment(Comment comment, long commentId){
        Comment findComment = repository.findById(commentId).orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        Optional.ofNullable(comment.getMention()).ifPresent(mention->findComment.setMention(mention));

        return repository.save(findComment);
    };

    public Comment findComment(long commentId){
        Comment comment = repository.findById(commentId).orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return comment;
    };

    public Page<Comment> findComments(int page, int size,long postId){

       return repository.findAllByPostId(postId, PageRequest.of(page - 1, size));
    };

    public void deleteComment(long commentId){
        Comment comment = repository.findById(commentId).orElseThrow(()->new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        if (repository.existsByParentId(commentId)) {
            comment.setDeleted(true);
            repository.save(comment);
        } else {
            Long parentId = comment.getParent() != null ? comment.getParent().getId() : null;
            repository.delete(comment);
            if (parentId != null) {
                cleanUpDeletedAncestors(parentId);
            }
        }
    };

    private void cleanUpDeletedAncestors(Long commentId) {
        Comment comment = repository.findById(commentId).orElse(null);
        if (comment == null) return;
        if (comment.isDeleted() && !repository.existsByParentId(commentId)) {
            Long parentId = comment.getParent() != null ? comment.getParent().getId() : null;
            repository.delete(comment);
            if (parentId != null) {
                cleanUpDeletedAncestors(parentId);
            }
        }
    }
}
