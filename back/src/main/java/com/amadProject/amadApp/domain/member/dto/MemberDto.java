package com.amadProject.amadApp.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MemberDto {

    @Getter
    @Setter
    public static class Response{
        private long id;
        private String nickname;
        private String statusImg;
        private String email;
        private int intimacy;
        private List<String> roles;
    }

    @Getter
    @Setter
    public static class ResponsesPage{
        private List<Response> members;
        private int totalPage;
    }
    @Getter
    @Setter
    public static class Post{
        private String email;

    }

    @Getter
    @Setter
    public static class Patch{
        private String nickname;
    }
}
