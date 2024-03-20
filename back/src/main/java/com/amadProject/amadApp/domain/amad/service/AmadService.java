package com.amadProject.amadApp.domain.amad.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.amad.entity.Amad;
import com.amadProject.amadApp.domain.amad.repository.AmadRepository;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AmadService {

    private final AmadRepository amadRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;


    @Transactional
    public Amad createAmad(Amad amad, long postId){

        Post findPost = postRepository.findById(postId).get();
        Member findMember = findPost.getMember();

        amad.setPost(findPost);
        amad.setMember(findMember);
        findMember.addAmad(amad);

        return amadRepository.save(amad);
    }

    public Amad updateAmad(Amad amad, long amadId){

        Amad findAmad = amadRepository.findById(amadId).get();
        Optional.ofNullable(amad.getMission())
                .ifPresent(mission-> findAmad.setMission(mission));
//        Optional.ofNullable(amad.getDescription())
//                .ifPresent(description-> findAmad.setDescription(description));

        findAmad.setComplete(amad.isComplete());

        return amadRepository.save(findAmad);
    }
///businessLogicException 적용
    public Amad findAmad(long amadId){
        return amadRepository.findById(amadId).orElseThrow(()-> new BusinessLogicException(ExceptionCode.AMAD_NOT_FOUND));
    }

    public void deleteAmad(long amadId){
        Amad amadToDelete = findAmad(amadId);
        amadRepository.delete(amadToDelete);
    }

    public Amad findTdyAmad(LocalDate writtenDate,long memberId){
        return amadRepository.findByDateNMemberId(writtenDate, memberId).orElseThrow(()->  new BusinessLogicException(ExceptionCode.AMAD_NOT_FOUND));
    }


}
