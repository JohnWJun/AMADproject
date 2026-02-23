package com.amadProject.amadApp.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class ChatDto {

    @Getter
    @Setter
    public static class MessageRequest {
        private String content;
    }

    @Getter
    @AllArgsConstructor
    public static class MessageResponse {
        private long messageId;
        private long roomId;
        private String senderEmail;
        private String senderNickname;
        private String content;
        private String createdAt; // ISO-8601 UTC string e.g. "2026-02-23T07:50:00+00:00"
    }

    @Getter
    @AllArgsConstructor
    public static class RoomResponse {
        private long roomId;
        private String otherEmail;
        private String otherNickname;
        private String otherStatusImg;
        private String lastMessage;
        private String lastMessageAt; // ISO-8601 UTC string
    }

    @Getter
    @AllArgsConstructor
    public static class RoomIdResponse {
        private long roomId;
    }

    @Getter
    @AllArgsConstructor
    public static class NotificationPayload {
        private long roomId;
    }
}
