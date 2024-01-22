package com.amadProject.amadApp.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

public class PostDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{
        private String title;
        private String bible;
        private int bibleChapter;
        private int bibleVerseFrom;
        private int bibleVerseTo;

        private String content_1;

        private String content_2;

        private String content_3;

        private String content_4;

        private String content_5;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch{
        private String title;
        private String bible;
        private int bibleChapter;
        private int bibleVerseFrom;
        private int bibleVerseTo;

        private String content_1;

        private String content_2;

        private String content_3;

        private String content_4;

        private String content_5;

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class BibleChapterVerseResponse{


        private String bible;

        private int bibleChapter;

        private int bibleVerseFrom;

        private int bibleVerseTo;
    }
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private String title;
        private String writer;
        private LocalDate publishedAt;
        private BibleChapterVerseResponse ScriptureForToday;
        private String content_1;
        private String content_2;
        private String content_3;
        private String content_4;
        private String content_5;

    }

}
