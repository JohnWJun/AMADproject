package com.amadProject.amadApp.domain.member.controller;

import com.amadProject.amadApp.domain.comment.dto.CommentDto;
import com.amadProject.amadApp.domain.comment.entity.Comment;
import com.amadProject.amadApp.domain.member.dto.MemberDto;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.mapper.MemberMapper;
import com.amadProject.amadApp.domain.member.service.MemberService;
import groovy.lang.GString;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/members")
@Validated
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping("/sign-up")
    public ResponseEntity postMember(@RequestBody MemberDto.Post post){
        Member member = memberMapper.memberPostToMember(post);
        MemberDto.Response response = memberMapper.memeberToMemberResponse(memberService.createMember(member));

        log.info("새로운 유저, "+member.getEmail()+" 이(가) 생성되었습니다.");

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    };

    //맴버 CRUD 미구현 구현 요망

    @GetMapping("/me")
    public ResponseEntity getMember(){
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        String email = String.valueOf(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        MemberDto.Response response= memberMapper.memeberToMemberResponse(memberService.findMember(email));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity getSpecificMember(@PathVariable("email") String email){
        System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        MemberDto.Response response= memberMapper.memeberToMemberResponse(memberService.findMember(email));
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getMembers(@Positive @RequestParam int page,
                                     @Positive @RequestParam int size){
        Page<Member> pages = memberService.findMembers(page,size);
        List<MemberDto.Response> responses = memberMapper.membersToMemberResponses(pages.getContent());
        return new ResponseEntity<>(responses,HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(long memberId){
        memberService.deleteMember(memberId);
        return new ResponseEntity<>("The member is deleted",HttpStatus.NO_CONTENT);
    }
}
