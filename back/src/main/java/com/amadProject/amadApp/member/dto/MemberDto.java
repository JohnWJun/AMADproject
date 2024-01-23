package com.amadProject.amadApp.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class MemberDto {

    @Getter
    @Setter
    public static class Response{
        private long memberId;
        private String email;
    }
    @Getter
    @Setter
    public static class Post{
        private String email;
    }
}
