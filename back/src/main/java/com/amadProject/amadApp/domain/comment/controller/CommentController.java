package com.amadProject.amadApp.domain.comment.controller;

import com.amadProject.amadApp.domain.comment.dto.CommentDto;
import com.amadProject.amadApp.domain.comment.entity.Comment;
import com.amadProject.amadApp.domain.comment.mapper.CommentMapper;
import com.amadProject.amadApp.domain.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/{post-id}/comment")
@Validated
@Slf4j
@RequiredArgsConstructor
public class CommentController {

    private final CommentService service;
    private final CommentMapper mapper;

    @PostMapping("/{member-id}")
    public ResponseEntity postComment(@RequestBody CommentDto.Post post,
                                      @PathVariable("post-id") long postId,
                                      @PathVariable("member-id") long memberId){

        Comment comment = service.createComment(mapper.postToComment(post), postId, memberId, post.getParentId());
        CommentDto.Response response = mapper.commentToResponse(comment);
      return new ResponseEntity<>(response,HttpStatus.CREATED);
    }
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@RequestBody CommentDto.Patch patch,
                                       @PathVariable("comment-id") long commentId){

        Comment comment = service.updateComment(mapper.patchToComment(patch), commentId);
        CommentDto.Response response = mapper.commentToResponse(comment);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment-id") long commentId){

        Comment comment = service.findComment(commentId);
        CommentDto.Response response = mapper.commentToResponse(comment);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getComments(@Positive @RequestParam int page,
                                      @Positive @RequestParam int size,
                                      @PathVariable("post-id") long postId){

        Page<Comment> pages = service.findComments(page,size,postId);
        int totalPage = pages.getTotalPages();
        CommentDto.PageResponse responses = mapper.responsesToPageResponse(mapper.commentsToResponses(pages.getContent()),totalPage);
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId){

        service.deleteComment(commentId);

        return new ResponseEntity<>("The comment is deleted",HttpStatus.NO_CONTENT);
    }
}
