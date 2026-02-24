package com.amadProject.amadApp.domain.search.postSearch;

import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.service.MemberService;
import com.amadProject.amadApp.domain.post.dto.PostDto;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.mapper.PostMapper;
import com.amadProject.amadApp.domain.post.service.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final MemberService memberService;

    @GetMapping
    public ResponseEntity getPostByKeyword(@RequestParam String keyword,
                                           @Positive @RequestParam int page,
                                           @Positive @RequestParam int size,
                                           @RequestParam(required = false) String f,
                                           @RequestParam(required = false) String pf) {

        String sortBy = "live".equals(f) ? "date" : "likes";
        Page<Post> foundPosts;
        if ("on".equals(pf)) {
            String email = String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            Member me = memberService.findMember(email);
            foundPosts = service.findPostsByKeywordAndFollowing(keyword, page, size, sortBy, me.getId());
        } else {
            foundPosts = service.findPostsByKeyword(keyword, page, size, sortBy);
        }
        List<PostDto.AbstractResponse> responses = mapper.postsToAbstractResponses(foundPosts.toList());
        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
