package com.amadProject.amadApp.common.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    AMAD_NOT_FOUND(404, "AMAD not found"),
    POST_NOT_FOUND(404, "Post not found"),
    MEMBER_EXISTS(409, "Member exists"),
    POST_EXISTS(409, "Post exists"),
    ALEADY_LIKED(409, "Already liked post"),
    ID_DOESNT_MATCH(403, "Id doesnt Match"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    COMMENT_NOT_EXIST(404, "Comment doesnt exist"),
    IMAGE_NOT_FOUND(404, "Image not found"),
    COMMENT_NOT_FOUND(404, "Comment not found"),
    LIKEPOST_NOT_FOUND(404, "likePost not found"),
    CHAT_ROOM_NOT_FOUND(404, "Chat room not found"),
    FOLLOW_EXISTS(409, "Already following"),
    FOLLOW_NOT_FOUND(404, "Follow not found"),
    GROUP_NOT_FOUND(404, "Group not found"),
    NOT_GROUP_MEMBER(403, "Not a group member"),
    NOT_GROUP_ADMIN(403, "Not a group admin"),
    MEMBER_ALREADY_IN_GROUP(409, "Already a member or pending"),
    JOIN_REQUEST_NOT_FOUND(404, "Join request not found"),
    AI_RATE_LIMITED(429, "Too many requests. Please wait a moment."),
    AI_SERVICE_UNAVAILABLE(503, "AI service is temporarily unavailable.");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
