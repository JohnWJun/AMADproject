package com.amadProject.amadApp.amad.service;

import com.amadProject.amadApp.amad.entity.Amad;
import com.amadProject.amadApp.amad.repository.AmadRepository;
import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.member.repository.MemberRepository;
import com.amadProject.amadApp.post.entity.Post;
import com.amadProject.amadApp.post.repository.PostRepository;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.NoSuchElementException;
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
        Optional.ofNullable(amad.getDescription())
                .ifPresent(description-> findAmad.setDescription(description));

        if (amad.isComplete()) findAmad.setComplete(true);

        findAmad.setModifiedAt(LocalDate.now());

        return amadRepository.save(findAmad);
    }

    public Amad findAmad(long amadId){
        return amadRepository.findById(amadId).orElseThrow(()-> new RuntimeException("No AMAD found"));
    }

    public void deleteAmad(long amadId){
        Amad amadToDelete = findAmad(amadId);
        amadRepository.delete(amadToDelete);
    }


}
