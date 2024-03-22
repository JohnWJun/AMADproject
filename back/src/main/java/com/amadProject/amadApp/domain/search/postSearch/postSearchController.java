package com.amadProject.amadApp.domain.search.postSearch;

import com.amadProject.amadApp.domain.post.dto.PostDto;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.mapper.PostMapper;
import com.amadProject.amadApp.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Positive;
import java.util.List;

@Slf4j
@Transactional
@RestController
@RequestMapping("search")
@RequiredArgsConstructor
public class postSearchController {

    private final PostMapper mapper;
    private final PostService service;
    @GetMapping
    public ResponseEntity getPostByKeyword(@RequestParam String keyword,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size){

        Page<Post> foundPosts = service.findPostsByKeyword(keyword,page, size);
        List<PostDto.AbstractResponse> responses = mapper.postsToAbstractResponses(foundPosts.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
