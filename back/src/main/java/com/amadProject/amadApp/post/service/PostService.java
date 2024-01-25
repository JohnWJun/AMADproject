package com.amadProject.amadApp.post.service;

import com.amadProject.amadApp.common.tools.calculator.MemberIntimacyCalculator;
import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.member.repository.MemberRepository;
import com.amadProject.amadApp.post.dto.PostDto;
import com.amadProject.amadApp.post.entity.BibleChapterVerse;
import com.amadProject.amadApp.post.entity.Post;
import com.amadProject.amadApp.post.repository.BibleChapterVerseRepository;
import com.amadProject.amadApp.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    private final MemberRepository memberRepository;

    private final BibleChapterVerseRepository bibleRepository;

    private final BibleVerseApiService apiService;
    private final MemberIntimacyCalculator memberIntimacyCalculator;



    @Transactional
    public Post createPost(Post post, LocalDate date){

        verifyExistPost(post.getMember().getEmail(), date);
        Member member = memberRepository.findByEmail(post.getMember().getEmail()).get();
        member.addPost(post);
        post.setMember(member);
        memberIntimacyCalculator.addIntimacyPoint(member);
        member.setMadePostToday(true);
        member.setPenaltyPoints(0);
        Post savedPost = postRepository.save(post);
        memberRepository.save(member);

       return savedPost;
    }

    public Post patchPost(Post post){

        Post findPost = postRepository.findById(post.getPostId()).get();
        Optional.ofNullable(post.getBibleChapterVerses())
                .ifPresent(bibleChapterVerses-> {

                   for (BibleChapterVerse bible : bibleChapterVerses){
                       bibleRepository.save(bible);
                   }
                    findPost.setBibleChapterVerses(bibleChapterVerses);
                });
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

    public Post findPost(String email, LocalDate date) {
        Optional<Post> optionalPost = postRepository.findByEmailNDate(email, date);
        return optionalPost.orElse(null);
    }


    public void deletePost(String email, LocalDate date){
        Post postToDelete = postRepository.findByEmailNDate(email,date).get();
        postRepository.delete(postToDelete);
    }

    public PostDto.BibleResponse getScripture(List<BibleChapterVerse> bibleChapterVerses) {
        List<String> scriptures = bibleChapterVerses.stream().map(
                bibleChapterVerse -> {
                    String scripture = apiService.getBible(bibleChapterVerse.getBible(),
                            String.valueOf(bibleChapterVerse.getBibleChapter()),
                            String.valueOf(bibleChapterVerse.getBibleVerseFrom()),
                            String.valueOf(bibleChapterVerse.getBibleVerseTo()));

                    return scripture;
                }
        ).collect(Collectors.toList());
        PostDto.BibleResponse bibleResponse = new PostDto.BibleResponse();
        bibleResponse.setScripts(scriptures);

        return bibleResponse;
    }
    private void verifyExistPost(String email, LocalDate date) {
        postRepository.findByEmailNDate(email, date).ifPresent(post -> {
            throw new RuntimeException("Post already exists for email: " + email + " and date: " + date);
        });
    }

}
