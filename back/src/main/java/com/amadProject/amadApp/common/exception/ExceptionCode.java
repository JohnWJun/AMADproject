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
    FOLLOW_NOT_FOUND(404, "Follow not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
