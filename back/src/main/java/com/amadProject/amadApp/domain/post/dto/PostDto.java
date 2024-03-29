package com.amadProject.amadApp.domain.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.SimpleTimeZone;

public class PostDto {
    @Getter
    @Setter
    public static class BibleChapterVersePost{
        private String bible;
        private int bibleChapter;
        private int bibleVerseFrom;
        private int bibleVerseTo;
    }
    @Getter
    @Setter
    public static class BibleChapterVersePatch{

        private String bible;
        private int bibleChapter;
        private int bibleVerseFrom;
        private int bibleVerseTo;
    }

    @Getter
    @Setter
    public static class BibleChapterVerseResponse{
        private String bible;
        private int bibleChapter;
        private int bibleVerseFrom;
        private int bibleVerseTo;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{

        private List<BibleChapterVersePost> bibleVerses;

        private String title;

        private String content_1;

        private String content_2;

        private String content_3;

        private String content_4;

        private String content_5;

        private String myAmad;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{
        private String title;
        private List<BibleChapterVersePatch> bibleVerses;

        private String content_1;

        private String content_2;

        private String content_3;

        private String content_4;

        private String content_5;

        private String myAmad;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private long id;
        private String title;
        private String writer;
        private String nickname;
        private LocalDateTime createdAt;
        private LocalDateTime lastModifiedAt;
        private List<BibleChapterVerseResponse> ScriptureForToday;
        private int likes;
        private String content_1;
        private String content_2;
        private String content_3;
        private String content_4;
        private String content_5;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class BibleResponse{
        private long bibleChapterVerseId;
        private String bible;
        private int bibleChapter;
        private int bibleVerseFrom;
        private int bibleVerseTo;
        private String script;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class BibleAPIResponse{
        private String html;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class PostBibleResponse{
        private long id;
        private String title;
        private String writer;
        private String nickname;
        private String statusImg;
        private LocalDateTime createdAt;
        private List<BibleResponse> scripts;
        private int likes;
        private int commentsNum;
        private List<Long> whoLikesMyPost;
        private String content_1;
        private String content_2;
        private String content_3;
        private String content_4;
        private String content_5;
        private String myAmad;
        private long myAmadId;
        private boolean isComplete;

    }

    @Getter
    @Setter
    public static class AbstractResponse{
        private long id;
        private String title;
        private String writer;
        private String nickname;
        private String statusImg;
        private LocalDateTime createdAt;
        private String content_1;
        private String myAmad;
        private int likes;
        private int commentsNum;
        private List<Long> whoLikesMyPost;

    }
    @Getter
    @Setter
    public static class AbstractPageResponse {

        private List<AbstractResponse> posts;
        private int totalPage;
    }

}
