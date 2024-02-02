package com.amadProject.amadApp.comment.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

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
        private LocalDate createdAt;
        private String mention;
    }

}
