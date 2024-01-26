package com.amadProject.amadApp.post.controller;

import com.amadProject.amadApp.post.dto.PostDto;
import com.amadProject.amadApp.post.entity.Post;
import com.amadProject.amadApp.post.mapper.PostMapper;
import com.amadProject.amadApp.post.service.BibleVerseApiService;
import com.amadProject.amadApp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Slf4j
@Transactional
@RestController
@RequestMapping("/post")
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
        LocalDate date = LocalDate.now();
        post.getMember().setEmail(email);
        PostDto.Response response = mapper.postToResponse(service.createPost(post,date));

        log.info("사용자 ("+email+") 님의 묵상이 "+ date + " 에 생성되었습니다.");

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{member-email}/{local-date}/{post-id}")
    public ResponseEntity patchPost(@PathVariable("member-email") String email,
                                    @PathVariable("local-date") String today,
                                    @PathVariable("post-id") long postId,
                                    @RequestBody PostDto.Patch patchDto){
        Post postToUpdate = mapper.patchDtoToPost(patchDto, postId);
        Post updatedPost = service.updatePost(postToUpdate);
        PostDto.Response response = mapper.postToResponse(updatedPost);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{member-email}/{local-date}")
    public ResponseEntity getPost(@PathVariable("member-email") String email,
                                  @PathVariable("local-date") String writtenDate){

        LocalDate date = LocalDate.parse(writtenDate, DateTimeFormatter.ISO_DATE);
        Post post = service.findPost(email,date);
        PostDto.BibleResponse scriptures = service.getScripture(post.getBibleChapterVerses());


        PostDto.PostBibleResponse response = mapper.postToPostBibleResponse(post,scriptures);


        return new ResponseEntity<>(response,HttpStatus.OK);
    }


    @DeleteMapping("/{member-email}/{local-date}")
    public ResponseEntity deletePost(@PathVariable("member-email") String email,
                                  @PathVariable("local-date") String writtenDate){
        LocalDate date = LocalDate.parse(writtenDate, DateTimeFormatter.ISO_DATE);
        service.deletePost(email,date);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
