package com.amadProject.amadApp.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class CommentDto {

    @Getter
    @Setter
    public static class Post{
        private String mention;
        private Long parentId;
    }

    @Getter
    @Setter
    public static class Patch{
        private String mention;
    }

    @Getter
    @Setter
    public static class Response{
        private long id;
        private long postId;
        private String nickname;
        private String writer;
        private String statusImg;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String mention;
        private boolean deleted;
        private List<Response> replies;
    }
    @Getter
    @Setter
    public static class PageResponse{
        private List<Response> responses;
        private int totalPage;
    }

}
