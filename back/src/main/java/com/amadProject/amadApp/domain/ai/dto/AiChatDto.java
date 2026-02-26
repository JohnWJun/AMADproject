package com.amadProject.amadApp.domain.ai.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class AiChatDto {

    /** Incoming request from the client. */
    @Getter
    @Setter
    public static class Request {
        @JsonProperty("text_ko")
        private String textKo;
        @JsonProperty("history_ko")
        private java.util.List<String> historyKo;
        @JsonProperty("limit_verses")
        private int limitVerses = 5;
    }

    /**
     * Structured response for every AI interaction.
     * status: "ok" | "error" | "limit_exceeded" | "rate_limited"
     */
    @Getter
    @Builder
    public static class ChatResponse {
        private String status;
        private String message;
        private int remainingTokens;
        private int dailyLimit;
    }

    /** A single chat message (user or assistant). */
    @Getter
    @Builder
    public static class MessageResponse {
        private String role;          // "user" or "assistant"
        private String content;
        private LocalDateTime createdAt;
    }

    /** Chat history returned on panel open. */
    @Getter
    @Builder
    public static class HistoryResponse {
        private List<MessageResponse> messages;
        private int tokensUsedToday;
        private int remainingTokens;
        private int dailyLimit;
    }
}
