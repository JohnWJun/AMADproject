package com.amadProject.amadApp.domain.group.dto;

import com.amadProject.amadApp.domain.group.entity.enums.GroupRole;
import com.amadProject.amadApp.domain.group.entity.enums.MemberStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

public class GroupDto {

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post {
        private String name;
        private String description;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Patch {
        private String name;
        private String description;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response {
        private Long id;
        private String name;
        private String description;
        private String creatorEmail;
        private String creatorNickname;
        private int memberCount;
        private GroupRole myRole;
        private MemberStatus myStatus;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class MemberResponse {
        private Long memberId;
        private String nickname;
        private String email;
        private String statusImg;
        private GroupRole role;
        private MemberStatus status;
    }
}
