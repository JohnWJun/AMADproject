package com.amadProject.amadApp.post.mapper;

import com.amadProject.amadApp.member.entity.Member;
import com.amadProject.amadApp.post.dto.PostDto;
import com.amadProject.amadApp.post.entity.BibleChapterVerse;
import com.amadProject.amadApp.post.entity.Post;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PostMapper {

    default Post postDtoToPost(PostDto.Post post){
        Post postToCreate = new Post();
        Member member = new Member();
        BibleChapterVerse bibleChapterVerse = new BibleChapterVerse();
        bibleChapterVerse.setBible(post.getBible());
        bibleChapterVerse.setBibleChapter(post.getBibleChapter());
        bibleChapterVerse.setBibleVerseFrom(post.getBibleVerseFrom());
        bibleChapterVerse.setBibleVerseTo(post.getBibleVerseTo());


        postToCreate.setTitle(post.getTitle());
        postToCreate.setMember(member);
        postToCreate.setContent_1(post.getContent_1());
        postToCreate.setContent_2(post.getContent_2());
        postToCreate.setContent_3(post.getContent_3());
        postToCreate.setContent_4(post.getContent_4());
        postToCreate.setContent_5(post.getContent_5());

        postToCreate.setBibleChapterVerse(bibleChapterVerse);
        return postToCreate;
    }

    default Post patchDtoToPost(PostDto.Patch patch){
        Post postToCreate = new Post();
        Member member = new Member();
        BibleChapterVerse bibleChapterVerse = new BibleChapterVerse();
        bibleChapterVerse.setBible(patch.getBible());
        bibleChapterVerse.setBibleChapter(patch.getBibleChapter());
        bibleChapterVerse.setBibleVerseFrom(patch.getBibleVerseFrom());
        bibleChapterVerse.setBibleVerseTo(patch.getBibleVerseTo());


        postToCreate.setTitle(patch.getTitle());
        postToCreate.setMember(member);
        postToCreate.setContent_1(patch.getContent_1());
        postToCreate.setContent_2(patch.getContent_2());
        postToCreate.setContent_3(patch.getContent_3());
        postToCreate.setContent_4(patch.getContent_4());
        postToCreate.setContent_5(patch.getContent_5());

        postToCreate.setBibleChapterVerse(bibleChapterVerse);
        return postToCreate;
    }

    default PostDto.Response postToResponse(Post post){
        PostDto.Response response = new PostDto.Response();
        PostDto.BibleChapterVerseResponse bibleChapterVerseResponse = new PostDto.BibleChapterVerseResponse();
        bibleChapterVerseResponse.setBibleChapter(post.getBibleChapterVerse().getBibleChapter());
        bibleChapterVerseResponse.setBibleVerseFrom(post.getBibleChapterVerse().getBibleVerseFrom());
        bibleChapterVerseResponse.setBibleVerseTo(post.getBibleChapterVerse().getBibleVerseTo());
        bibleChapterVerseResponse.setBible(post.getBibleChapterVerse().getBible());

        response.setScriptureForToday(bibleChapterVerseResponse);
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
