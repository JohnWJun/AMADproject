package com.amadProject.amadApp.comment.controller;

import com.amadProject.amadApp.comment.dto.CommentDto;
import com.amadProject.amadApp.comment.entity.Comment;
import com.amadProject.amadApp.comment.mapper.CommentMapper;
import com.amadProject.amadApp.comment.service.CommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

        Comment comment = service.createComment(mapper.postToComment(post),postId,memberId);
        CommentDto.Response response = mapper.commentToResponse(comment);
      return new ResponseEntity<>(HttpStatus.CREATED);
    }
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(){
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping
    public ResponseEntity getComments(){
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(){
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
