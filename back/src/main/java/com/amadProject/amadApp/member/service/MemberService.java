package com.amadProject.amadApp.member.service;

import com.amadProject.amadApp.member.repository.MemberRepository;
import com.amadProject.amadApp.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;


    public Member createMember(Member member){
        if (!existsEmail(member.getEmail())) {
            Member savedMember = memberRepository.save(member);
            return savedMember;
        }
        return null;
        }

    public Member updateMember(Member member){
        Member foundMember = findVerifiedMember(member.getEmail());

        return memberRepository.save(foundMember);
    }
    @Transactional(readOnly = true)
    public Member findMember(String email){
        return findVerifiedMember(email);
    }

    public void deleteMember(Long memberId){
        Member member = memberRepository.findById(memberId).get();
        memberRepository.delete(member);
    }
    @Transactional(readOnly = true)
    public Member findVerifiedMember(String email) {
        Optional<Member> findMember = memberRepository.findByEmail(email);
        Member foundMember = findMember.orElseThrow(()-> new RuntimeException());
        return foundMember;
    }

    public boolean existsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        return member.isPresent();
    }
}
