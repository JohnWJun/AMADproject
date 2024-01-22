package com.amadProject.amadApp.post.service;

import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.member.repository.MemberRepository;
import com.amadProject.amadApp.post.entity.Post;
import com.amadProject.amadApp.post.repository.PostRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Transactional
@Service
public class PostService {
    private final PostRepository postRepository;

    private final MemberRepository memberRepository;

    public PostService(PostRepository postRepository, MemberRepository memberRepository) {
        this.postRepository = postRepository;
        this.memberRepository = memberRepository;
    }

    public Post createPost(Post post){

        Member member = memberRepository.findByEmail(post.getMember().getEmail()).get();
        member.addPost(post);
        post.setMember(member);
        Post savedPost = postRepository.save(post);
        memberRepository.save(member);

       return savedPost;
    }

    public Post patchPost(Post post){

        Post findPost = postRepository.findById(post.getPostId()).get();
        Optional.ofNullable(post.getBibleChapterVerse())
                .ifPresent(bibleChapterVerse-> findPost.setBibleChapterVerse(bibleChapterVerse));
        Optional.ofNullable(post.getTitle())
                .ifPresent(title-> findPost.setTitle(title));
        Optional.ofNullable(post.getContent_1())
                .ifPresent(content-> findPost.setContent_1(content));
        Optional.ofNullable(post.getContent_2())
                .ifPresent(content-> findPost.setContent_2(content));
        Optional.ofNullable(post.getContent_3())
                .ifPresent(content-> findPost.setContent_3(content));
        Optional.ofNullable(post.getContent_4())
                .ifPresent(content-> findPost.setContent_4(content));
        Optional.ofNullable(post.getContent_5())
                .ifPresent(content-> findPost.setContent_5(content));

        return postRepository.save(findPost);
    }

    public Post findPost(String email, LocalDate date){
        return postRepository.findByEmailNDate(email,date).get();

    }

    public void deletePost(String email, LocalDate date){
        Post postToDelete = postRepository.findByEmailNDate(email,date).get();
        postRepository.delete(postToDelete);
    }

}
