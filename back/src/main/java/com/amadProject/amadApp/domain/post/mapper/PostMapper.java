package com.amadProject.amadApp.domain.post.mapper;

import com.amadProject.amadApp.domain.amad.entity.Amad;
import com.amadProject.amadApp.domain.group.entity.StudyGroup;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.post.dto.PostDto;
import com.amadProject.amadApp.domain.post.entity.BibleChapterVerse;
import com.amadProject.amadApp.domain.post.entity.Post;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface PostMapper {

    default Post postDtoToPost(PostDto.Post post){
        Post postToCreate = new Post();
        Member member = new Member();
        Amad myAmad = new Amad();
        List<BibleChapterVerse> bibleChapterVerses = post.getBibleVerses().stream().map(
                bibleChapterVersePost -> {
                    BibleChapterVerse bible = new BibleChapterVerse();
                    bible.setPost(postToCreate);
                    bible.setBible(bibleChapterVersePost.getBible());
                    bible.setBibleChapter(bibleChapterVersePost.getBibleChapter());
                    bible.setBibleVerseFrom(bibleChapterVersePost.getBibleVerseFrom());
                    bible.setBibleVerseTo(bibleChapterVersePost.getBibleVerseTo());
//                    postToCreate.addBible(bible);
                    return bible;
                }
        ).collect(Collectors.toList());

        myAmad.setPost(postToCreate);
        myAmad.setMember(member);
        myAmad.setMission(post.getMyAmad());
        postToCreate.setAmad(myAmad);
        postToCreate.setTitle(post.getTitle());
        postToCreate.setMember(member);
        postToCreate.setContent_1(post.getContent_1());
        postToCreate.setContent_2(post.getContent_2());
        postToCreate.setContent_3(post.getContent_3());
        postToCreate.setContent_4(post.getContent_4());
        postToCreate.setContent_5(post.getContent_5());

        postToCreate.setBibleChapterVerses(bibleChapterVerses);

        if (post.getGroupId() != null) {
            StudyGroup sg = new StudyGroup();
            sg.setId(post.getGroupId());
            postToCreate.setStudyGroup(sg);
        }

        if (Boolean.TRUE.equals(post.getIsGroupOnly())) {
            postToCreate.setIsGroupOnly(true);
        }

        return postToCreate;
    }

    default Post patchDtoToPost(PostDto.Patch patch, long postId, long bibleChapterVerseId, long amadId){
        Post post = new Post();
        post.setId(postId);
        Member member = new Member();
        Amad myAmad = new Amad();
        System.out.println("in Mapper: "+ patch.getBibleVerses().toString());
        List<BibleChapterVerse> bibleChapterVerses = patch.getBibleVerses().stream().map(
                bibleChapterVersePatch -> {
                    BibleChapterVerse bible = new BibleChapterVerse();
                    bible.setId(bibleChapterVerseId);
                    bible.setPost(post);
                    bible.setBible(bibleChapterVersePatch.getBible());
                    bible.setBibleChapter(bibleChapterVersePatch.getBibleChapter());
                    bible.setBibleVerseFrom(bibleChapterVersePatch.getBibleVerseFrom());
                    bible.setBibleVerseTo(bibleChapterVersePatch.getBibleVerseTo());
                    return bible;
                }
        ).collect(Collectors.toList());

        myAmad.setPost(post);
        myAmad.setId(amadId);
        myAmad.setMission(patch.getMyAmad());


        post.setTitle(patch.getTitle());
        post.setMember(member);
        post.setContent_1(patch.getContent_1());
        post.setContent_2(patch.getContent_2());
        post.setContent_3(patch.getContent_3());
        post.setContent_4(patch.getContent_4());
        post.setContent_5(patch.getContent_5());
        post.setAmad(myAmad);

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


        response.setId(post.getId());
        response.setScriptureForToday(bibleChapterVerseResponses);
        response.setTitle(post.getTitle());
        response.setWriter(post.getMember().getEmail());
        response.setCreatedAt(post.getPublishedDate());
        response.setLastModifiedAt(post.getModifiedAt());
        response.setContent_1(post.getContent_1());
        response.setContent_2(post.getContent_2());
        response.setContent_3(post.getContent_3());
        response.setContent_4(post.getContent_4());
        response.setContent_5(post.getContent_5());
        response.setLikes(post.getWhoLikesMyPost().size());
        response.setNickname(post.getMember().getNickname());

        return response;

    }


    default PostDto.PostBibleResponse postToPostBibleResponse(Post post, List<PostDto.BibleResponse> bibleResponse){
        PostDto.PostBibleResponse response = new PostDto.PostBibleResponse();

        response.setScripts(bibleResponse);
        response.setId(post.getId());
        response.setTitle(post.getTitle());
        response.setWriter(post.getMember().getEmail());
        response.setCreatedAt(post.getPublishedDate());
        response.setContent_1(post.getContent_1());
        response.setContent_2(post.getContent_2());
        response.setContent_3(post.getContent_3());
        response.setContent_4(post.getContent_4());
        response.setContent_5(post.getContent_5());
        response.setMyAmad(post.getAmad().getMission());
        response.setLikes(post.getWhoLikesMyPost().size());
        response.setNickname(post.getMember().getNickname());
        response.setStatusImg(post.getMember().getStatusImg());
        response.setMyAmadId(post.getAmad().getId());
        response.setComplete(post.getAmad().isComplete());
        response.setCommentsNum(post.getComments().size());
        List<Long> likers = post.getWhoLikesMyPost().stream().map(
                likePost -> {
                   Long liker = likePost.getLiker().getId();
                   return liker;
                }
        ).collect(Collectors.toList());
                response.setWhoLikesMyPost(likers);
        return response;

    }
    List<PostDto.Response> postsToResponses(List<Post> posts);

    default PostDto.BibleAPIResponse apiBibleToResponse(String script){
        PostDto.BibleAPIResponse response = new PostDto.BibleAPIResponse();
        response.setHtml(script);

        return  response;

    };

    default PostDto.AbstractResponse postToAbstractResponse(Post post){
        PostDto.AbstractResponse abstractResponse = new PostDto.AbstractResponse();

        abstractResponse.setId(post.getId());
        abstractResponse.setTitle(post.getTitle());
        abstractResponse.setWriter(post.getMember().getEmail());
        abstractResponse.setCreatedAt(post.getPublishedDate());
        abstractResponse.setContent_1(post.getContent_1());
        abstractResponse.setLikes(post.getWhoLikesMyPost().size());
        abstractResponse.setNickname(post.getMember().getNickname());
        abstractResponse.setStatusImg(post.getMember().getStatusImg());
        abstractResponse.setMyAmad(post.getAmad().getMission());
        abstractResponse.setCommentsNum(post.getComments().size());
        List<Long> likers = post.getWhoLikesMyPost().stream().map(
                likePost -> {
                    Long liker = likePost.getLiker().getId();
                    return liker;
                }
        ).collect(Collectors.toList());
        abstractResponse.setWhoLikesMyPost(likers);

        if (post.getStudyGroup() != null) {
            abstractResponse.setGroupId(post.getStudyGroup().getId());
            abstractResponse.setGroupName(post.getStudyGroup().getName());
        }

        abstractResponse.setIsGroupOnly(post.getIsGroupOnly());

        return abstractResponse;
    }

    List<PostDto.AbstractResponse> postsToAbstractResponses(List<Post> posts);
   default PostDto.AbstractPageResponse postsToAbstractPageResponses(List<PostDto.AbstractResponse> posts, int totalPage){
       PostDto.AbstractPageResponse pageResponse = new PostDto.AbstractPageResponse();
       pageResponse.setPosts(posts);
       pageResponse.setTotalPage(totalPage);
       return pageResponse;
   };


}
