package com.amadProject.amadApp.member.controller;

import com.amadProject.amadApp.member.dto.MemberDto;
import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.member.mapper.MemberMapper;
import com.amadProject.amadApp.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public ResponseEntity getMembers(){
        //
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(){
        //
        return new ResponseEntity<>("",HttpStatus.NO_CONTENT);
    }
}
