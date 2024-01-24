package com.amadProject.amadApp.post.controller;

import com.amadProject.amadApp.post.dto.PostDto;
import com.amadProject.amadApp.post.entity.Post;
import com.amadProject.amadApp.post.mapper.PostMapper;
import com.amadProject.amadApp.post.service.BibleVerseApiService;
import com.amadProject.amadApp.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

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

        return new ResponseEntity<>(bibleVerse,HttpStatus.OK);
    }

    @PostMapping("/{member-email}/{local-date}")
    public ResponseEntity postPost(@PathVariable("member-email") String email,
                                   @PathVariable("local-date") String today,
                                   @RequestBody PostDto.Post postDto){
        Post post = mapper.postDtoToPost(postDto);
        post.getMember().setEmail(email);
        PostDto.Response response = mapper.postToResponse(service.createPost(post));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PatchMapping("/{member-email}/{local-date}/{post-id}")
    public ResponseEntity patchPost(@PathVariable("member-email") String email,
                                    @PathVariable("local-date") String today,
                                    @PathVariable("post-id") long postId,
                                    @RequestBody PostDto.Patch patchDto){
        Post postToUpdate = mapper.patchDtoToPost(patchDto, postId);
        System.out.println("in-Controller: "+ postToUpdate.getBibleChapterVerses().toString());
        Post updatedPost = service.patchPost(postToUpdate);
        PostDto.Response response = mapper.postToResponse(updatedPost);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{member-email}/{local-date}")
    public ResponseEntity getPost(@PathVariable("member-email") String email,
                                  @PathVariable("local-date") String writtenDate){
        LocalDate date = LocalDate.parse(writtenDate, DateTimeFormatter.ISO_DATE);
        Post post = service.findPost(email,date);
        PostDto.Response response = mapper.postToResponse(post);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }
    // getPost는 미구현 구현여부 타진중

    @DeleteMapping("/{member-email}/{local-date}")
    public ResponseEntity deletPost(@PathVariable("member-email") String email,
                                  @PathVariable("local-date") String writtenDate){
        LocalDate date = LocalDate.parse(writtenDate, DateTimeFormatter.ISO_DATE);
        service.deletePost(email,date);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
