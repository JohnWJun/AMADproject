package com.amadProject.amadApp.post.dto;

import com.amadProject.amadApp.post.entity.BibleChapterVerse;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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
        private long bibleChapterVerseId;
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

    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private String title;
        private String writer;
        private LocalDate publishedAt;
        private List<BibleChapterVerseResponse> ScriptureForToday;
        private String content_1;
        private String content_2;
        private String content_3;
        private String content_4;
        private String content_5;

    }

}
