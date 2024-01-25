package com.amadProject.amadApp.post.mapper;

import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.post.dto.PostDto;
import com.amadProject.amadApp.post.entity.BibleChapterVerse;
import com.amadProject.amadApp.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PostMapper {

    default Post postDtoToPost(PostDto.Post post){
        Post postToCreate = new Post();
        Member member = new Member();
        List<BibleChapterVerse> bibleChapterVerses = post.getBibleVerses().stream().map(
                bibleChapterVersePost -> {
                    BibleChapterVerse bible = new BibleChapterVerse();
                    bible.setPost(postToCreate);
                    bible.setBible(bibleChapterVersePost.getBible());
                    bible.setBibleChapter(bibleChapterVersePost.getBibleChapter());
                    bible.setBibleVerseFrom(bibleChapterVersePost.getBibleVerseFrom());
                    bible.setBibleVerseTo(bibleChapterVersePost.getBibleVerseTo());
                    postToCreate.addBible(bible);
                    return bible;
                }
        ).collect(Collectors.toList());


        postToCreate.setTitle(post.getTitle());
        postToCreate.setMember(member);
        postToCreate.setContent_1(post.getContent_1());
        postToCreate.setContent_2(post.getContent_2());
        postToCreate.setContent_3(post.getContent_3());
        postToCreate.setContent_4(post.getContent_4());
        postToCreate.setContent_5(post.getContent_5());

        postToCreate.setBibleChapterVerses(bibleChapterVerses);
        return postToCreate;
    }

    default Post patchDtoToPost(PostDto.Patch patch, long postId){
        Post post = new Post();
        post.setPostId(postId);
        Member member = new Member();
        System.out.println("in Mapper: "+ patch.getBibleVerses().toString());
        List<BibleChapterVerse> bibleChapterVerses = patch.getBibleVerses().stream().map(
                bibleChapterVersePatch -> {
                    BibleChapterVerse bible = new BibleChapterVerse();
                    bible.setBibleChapterVerseId(bibleChapterVersePatch.getBibleChapterVerseId());
                    bible.setPost(post);
                    bible.setBible(bibleChapterVersePatch.getBible());
                    bible.setBibleChapter(bibleChapterVersePatch.getBibleChapter());
                    bible.setBibleVerseFrom(bibleChapterVersePatch.getBibleVerseFrom());
                    bible.setBibleVerseTo(bibleChapterVersePatch.getBibleVerseTo());
                    return bible;
                }
        ).collect(Collectors.toList());


        post.setTitle(patch.getTitle());
        post.setMember(member);
        post.setContent_1(patch.getContent_1());
        post.setContent_2(patch.getContent_2());
        post.setContent_3(patch.getContent_3());
        post.setContent_4(patch.getContent_4());
        post.setContent_5(patch.getContent_5());

        post.setBibleChapterVerses(bibleChapterVerses);
        return post;
    }

    default PostDto.Response postToResponse(Post post){
        PostDto.Response response = new PostDto.Response();
        List<PostDto.BibleChapterVerseResponse> bibleChapterVerseResponses = post.getBibleChapterVerses().stream()
                .map(
                        bibleChapterVerse -> {
                            PostDto.BibleChapterVerseResponse bibleChapterVerseResponse = new PostDto.BibleChapterVerseResponse();
                            bibleChapterVerseResponse.setBible(bibleChapterVerse.getBible());
                            bibleChapterVerseResponse.setBibleChapter(bibleChapterVerse.getBibleChapter());
                            bibleChapterVerseResponse.setBibleVerseFrom(bibleChapterVerse.getBibleVerseFrom());
                            bibleChapterVerseResponse.setBibleVerseTo(bibleChapterVerse.getBibleVerseTo());
                            return bibleChapterVerseResponse;
                        }
                ).collect(Collectors.toList());



        response.setScriptureForToday(bibleChapterVerseResponses);
        response.setTitle(post.getTitle());
        response.setWriter(post.getMember().getEmail());
        response.setPublishedAt(post.getPublishedAt());
        response.setContent_1(post.getContent_1());
        response.setContent_2(post.getContent_2());
        response.setContent_3(post.getContent_3());
        response.setContent_4(post.getContent_4());
        response.setContent_5(post.getContent_5());

        return response;

    }


    default PostDto.PostBibleResponse postToPostBibleResponse(Post post, PostDto.BibleResponse bibleResponse){
        PostDto.PostBibleResponse response = new PostDto.PostBibleResponse();

        response.setScripts(bibleResponse);
        response.setTitle(post.getTitle());
        response.setWriter(post.getMember().getEmail());
        response.setPublishedAt(post.getPublishedAt());
        response.setContent_1(post.getContent_1());
        response.setContent_2(post.getContent_2());
        response.setContent_3(post.getContent_3());
        response.setContent_4(post.getContent_4());
        response.setContent_5(post.getContent_5());

        return response;

    }
    List<PostDto.Response> postsToResponses(List<Post> posts);
}
