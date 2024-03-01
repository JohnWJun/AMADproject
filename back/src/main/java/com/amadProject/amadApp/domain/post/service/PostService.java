package com.amadProject.amadApp.domain.post.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.common.tools.calculator.MemberIntimacyCalculator;
import com.amadProject.amadApp.domain.amad.entity.Amad;
import com.amadProject.amadApp.domain.amad.repository.AmadRepository;
import com.amadProject.amadApp.domain.amad.service.AmadService;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import com.amadProject.amadApp.domain.post.dto.PostDto;
import com.amadProject.amadApp.domain.post.entity.BibleChapterVerse;
import com.amadProject.amadApp.domain.post.entity.Post;
import com.amadProject.amadApp.domain.post.like.entity.LikePost;
import com.amadProject.amadApp.domain.post.repository.BibleChapterVerseRepository;
import com.amadProject.amadApp.domain.post.repository.PostRepository;
import com.amadProject.amadApp.domain.post.like.repository.LikePostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class PostService {


    private final PostRepository postRepository;

    private final MemberRepository memberRepository;

    private final BibleChapterVerseRepository bibleRepository;

    private final LikePostRepository likePostRepository;

    private final AmadRepository amadRepository;

    private final BibleVerseApiService apiService;

    private final MemberIntimacyCalculator memberIntimacyCalculator;





    @Transactional
    public Post createPost(Post post, LocalDate date){

        verifyExistPost(post.getMember().getEmail(), date);
        Member member = memberRepository.findByEmail(post.getMember().getEmail()).get();
        post.getAmad().setMember(member);

//        member.addPost(post);
        post.setMember(member);
        memberIntimacyCalculator.addIntimacyPoint(member);
        member.setMadePostToday(true);
        member.setPenaltyPoints(0);
        Post savedPost = postRepository.save(post);
        memberRepository.save(member);
//        amadRepository.save(post.getAmad());

       return savedPost;
    }

    public Post updatePost(Post post){

        Post findPost = postRepository.findById(post.getId()).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
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
        Optional.ofNullable(post.getAmad())
                .ifPresent(amad-> findPost.setAmad(amad));
        return postRepository.save(findPost);
    }

    public Post findPost(long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
    }


    public void deletePost(long postId){
        Post postToDelete = postRepository.findById(postId).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        postRepository.delete(postToDelete);
    }

    public List<PostDto.BibleResponse> getScripture(List<BibleChapterVerse> bibleChapterVerses) {
        List<PostDto.BibleResponse> scriptures = bibleChapterVerses.stream().map(
                bibleChapterVerse -> {
                    PostDto.BibleResponse response = new PostDto.BibleResponse();
                    String scripture = apiService.getBible(bibleChapterVerse.getBible(),
                            String.valueOf(bibleChapterVerse.getBibleChapter()),
                            String.valueOf(bibleChapterVerse.getBibleVerseFrom()),
                            String.valueOf(bibleChapterVerse.getBibleVerseTo()));
                    response.setBibleChapterVerseId(bibleChapterVerse.getId());
                    response.setBible(bibleChapterVerse.getBible());
                    response.setScript(scripture);
                    response.setBibleChapter(bibleChapterVerse.getBibleChapter());
                    response.setBibleVerseFrom(bibleChapterVerse.getBibleVerseFrom());
                    response.setBibleVerseTo(bibleChapterVerse.getBibleVerseTo());

                    return response;
                }
        ).collect(Collectors.toList());

        return scriptures;
    }
    private void verifyExistPost(String email, LocalDate date) {
        postRepository.findByEmailNDate(email, date).ifPresent(post -> {
            throw new BusinessLogicException(ExceptionCode.POST_EXISTS);
        });
    }

    public Post createLike(long postID, long memberId){

        Post post = postRepository.findById(postID).orElseThrow(()->new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        Member memberToLike = post.getMember();
        Member memberWhoLikes = memberRepository.findById(memberId).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        LikePost likePost = new LikePost();
        likePost.setPost(post);
        likePost.setMember(memberToLike);
        likePost.setLiker(memberWhoLikes);

//        memberToLike.addPostsILike(likePost);
//        post.addLikePost(likePost);
//        memberRepository.save(memberToLike);
//        postRepository.save(post);

        likePostRepository.save(likePost);

        return post;
    }

    public Page<Post> findTodayPosts(LocalDate writtenDate, int page,int size) {

        return postRepository.findAllByWrittenDate( writtenDate, PageRequest.of(page-1,size, Sort.by("createdAt").descending()));

    }

    public Page<Post> findPosts(String email, int page, int size) {
        LocalDate tdy = LocalDate.now();
        return postRepository.findAllByEmailExcToday(tdy,email,PageRequest.of(page-1, size, Sort.by("createdAt").descending()));
    }

    public Page<Post> findAllPosts( int page, int size) {
        LocalDate tdy = LocalDate.now();
        return postRepository.findAll(PageRequest.of(page-1, size, Sort.by("createdAt").descending()));
    }
}
