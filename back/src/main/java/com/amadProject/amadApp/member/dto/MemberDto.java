package com.amadProject.amadApp.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MemberDto {
    @AllArgsConstructor
    @Getter
    public static class Response{
        private long memberId;
        private String email;
    }
}
