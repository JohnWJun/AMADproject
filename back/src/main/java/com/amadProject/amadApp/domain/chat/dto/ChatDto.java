package com.amadProject.amadApp.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

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
        private LocalDateTime createdAt;
    }

    @Getter
    @AllArgsConstructor
    public static class RoomResponse {
        private long roomId;
        private String otherEmail;
        private String otherNickname;
        private String otherStatusImg;
        private String lastMessage;
        private LocalDateTime lastMessageAt;
    }

    @Getter
    @AllArgsConstructor
    public static class RoomIdResponse {
        private long roomId;
    }
}
