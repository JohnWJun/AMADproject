package com.amadProject.amadApp.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class MemberDto {

    @Getter
    @Setter
    public static class Response{
        private long memberId;
        private String nickname;
        private String statusImg;
        private String email;
        private int intimacy;
    }
    @Getter
    @Setter
    public static class Post{
        private String email;
        private String gender;
    }

    @Getter
    @Setter
    public static class Patch{
        private String nickname;
    }
}
