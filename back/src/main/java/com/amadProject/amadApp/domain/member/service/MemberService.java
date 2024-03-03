package com.amadProject.amadApp.domain.member.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.common.tools.generator.MemberNicknameGenerator;
import com.amadProject.amadApp.common.tools.generator.NickNameGenerator;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final MemberNicknameGenerator nicknameGenerator;


    public Member createMember(Member member){
        if (isExistsEmail(member.getEmail())) {
            member.setNickname(nicknameGenerator.randomNickNameGenerator(NickNameGenerator.adjectives,NickNameGenerator.characters));
            Member savedMember = memberRepository.save(member);
            return savedMember;
        }
        throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
        }

    public Member updateMember(Member member, long memberId){
        Member foundMember = memberRepository.findById(memberId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> foundMember.setNickname(nickname));

        return memberRepository.save(foundMember);
    }
    @Transactional(readOnly = true)
    public Member findMember(String email){
        return findVerifiedMember(email);
    }

    @Transactional(readOnly = true)
    public Page<Member> findMembers(int page, int size){
        return memberRepository.findAll( PageRequest.of(page-1,size, Sort.by("createdAt").descending()));

    }
    @Transactional(readOnly = true)
    public Page<Member> findRecommendedMembers(int page, int size){
        return memberRepository.findAll( PageRequest.of(page-1,size, Sort.by("intimacy").descending()));

    }

    public void deleteMember(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        memberRepository.delete(member);
    }
    @Transactional(readOnly = true)
    public Member findVerifiedMember(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        Member foundMember = findMember.orElseThrow(()-> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return foundMember;
    }

    public boolean isExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isEmpty();
    }
}
