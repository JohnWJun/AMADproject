package com.amadProject.amadApp.member.controller;

import com.amadProject.amadApp.member.dto.MemberDto;
import com.amadProject.amadApp.member.mapper.MemberMapper;
import com.amadProject.amadApp.member.service.MemberService;
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
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;


    public MemberController(MemberService memberService, MemberMapper memberMapper) {
        this.memberService = memberService;
        this.memberMapper = memberMapper;
    }




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
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
