package com.amadProject.amadApp.domain.comment.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class CommentDto {

    @Getter
    @Setter
    public static class Post{
        private String mention;
    }

    @Getter
    @Setter
    public static class Patch{
        private String mention;
    }

    @Getter
    @Setter
    public static class Response{
        private String nickname;
        private LocalDateTime createdAt;
        private LocalDateTime modifiedAt;
        private String mention;
    }

}