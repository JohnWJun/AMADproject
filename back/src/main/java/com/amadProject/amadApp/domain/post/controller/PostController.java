package com.amadProject.amadApp.domain.post.controller;

import com.amadProject.amadApp.domain.post.dto.PostDto;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.mapper.PostMapper;
import com.amadProject.amadApp.domain.post.service.BibleVerseApiService;
import com.amadProject.amadApp.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Transactional
@RestController
@RequestMapping("post")
@RequiredArgsConstructor
public class PostController {

    private final PostMapper mapper;

    private final PostService service;

    private final BibleVerseApiService apiService;


    @GetMapping("/api-bible/{bible}/{chapter}/{from}/{to}")
    public ResponseEntity getBible(@PathVariable("bible") String bible,
                                   @PathVariable("chapter") String chapter,
                                   @PathVariable("from") String from,
                                   @PathVariable("to") String to){
        String bibleVerse = apiService.getBible(bible, chapter, from, to);
        PostDto.BibleAPIResponse response = mapper.apiBibleToResponse(bibleVerse);
        log.info("성경구절 API 성공!");

        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @PostMapping("/{member-email}")
    public ResponseEntity postPost(@PathVariable("member-email") String email,
                                   @RequestBody PostDto.Post postDto){
        Post post = mapper.postDtoToPost(postDto);
        LocalDateTime date = LocalDateTime.now();
        post.getMember().setEmail(email);
        PostDto.Response response = mapper.postToResponse(service.createPost(post,date));

        log.info("사용자 ("+email+") 님의 묵상이 "+ date + " 에 생성되었습니다.");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    @PostMapping("{post-id}/{member-id}/like")
    public ResponseEntity postLikePost(@PathVariable("post-id") long postId,
                                       @PathVariable("member-id") long memberId){

        PostDto.Response response = mapper.postToResponse(service.createLike(postId,memberId));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    @DeleteMapping("{post-id}/{member-id}/dislike")
    public ResponseEntity postDislikePost(@PathVariable("post-id") long postId,
                                       @PathVariable("member-id") long memberId){
        service.deleteLikePost(postId,memberId);
        return new ResponseEntity<>("disliked the post", HttpStatus.OK);
    }

    @PatchMapping("/{post-id}/{bibleChapterVerse-id}/{amad-id}")
    public ResponseEntity patchPost(@PathVariable("post-id") long postId,
                                    @PathVariable("bibleChapterVerse-id") long bibleChapterVerseId,
                                    @PathVariable("amad-id") long amadId,
                                    @RequestBody PostDto.Patch patchDto){
        Post postToUpdate = mapper.patchDtoToPost(patchDto, postId,bibleChapterVerseId,amadId);
        Post updatedPost = service.updatePost(postToUpdate);
        PostDto.Response response = mapper.postToResponse(updatedPost);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("detail/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") long postId){

        Post post = service.findPost(postId);
        List<PostDto.BibleResponse> scriptures = service.getScripture(post.getBibleChapterVerses());


        PostDto.PostBibleResponse response = mapper.postToPostBibleResponse(post,scriptures);


        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("my/{member-id}/{local-date}")
    public ResponseEntity getMyTdyPost(@PathVariable("member-id") long memberId,
                                       @PathVariable("local-date") String writtenDate){
        LocalDate date = LocalDate.parse(writtenDate, DateTimeFormatter.ISO_DATE);
        Post post = service.findMyTdyPost(memberId, date);
        List<PostDto.BibleResponse> scriptures = service.getScripture(post.getBibleChapterVerses());


        PostDto.PostBibleResponse response = mapper.postToPostBibleResponse(post,scriptures);


        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    @GetMapping("/today/{local-date}")
    public ResponseEntity getTodayPosts(@PathVariable("local-date") String writtenDate,
                                        @Positive @RequestParam int page,
                                        @Positive @RequestParam int size){
        LocalDate date = LocalDate.parse(writtenDate, DateTimeFormatter.ISO_DATE);
        Page<Post> todayPosts = service.findTodayPosts(date,page, size);
        List<PostDto.AbstractResponse> responses = mapper.postsToAbstractResponses(todayPosts.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
    @GetMapping("/all")
    public ResponseEntity getPosts(@Positive @RequestParam int page,
                                   @Positive @RequestParam int size){

        Page<Post> posts = service.findAllPosts(page, size);
        List<PostDto.AbstractResponse> responses = mapper.postsToAbstractResponses(posts.toList());
        int totalPage = posts.getTotalPages();
        PostDto.AbstractPageResponse finalResponses = mapper.postsToAbstractPageResponses(responses,totalPage);
        return new ResponseEntity<>(finalResponses, HttpStatus.OK);
    }

    @GetMapping("/last/{member-email}")
    public ResponseEntity getMyLastPosts(@PathVariable("member-email") String email,
                                        @Positive @RequestParam int page,
                                        @Positive @RequestParam int size){

        Page<Post> todayPosts = service.findPosts(email,page, size);
        List<PostDto.AbstractResponse> responses = mapper.postsToAbstractResponses(todayPosts.toList());
        int totalPage = todayPosts.getTotalPages();
        PostDto.AbstractPageResponse finalResponses = mapper.postsToAbstractPageResponses(responses,totalPage);
        return new ResponseEntity<>(finalResponses, HttpStatus.OK);
    }

    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") long postId){
        service.deletePost(postId);
        return new ResponseEntity<>("the Post is deleted",HttpStatus.NO_CONTENT);
    }
}
