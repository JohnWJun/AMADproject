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
        /** User's current subscription tier (FREE, PREMIUM, GRACE, CANCELING). */
        private String tier;
        /** How many AI requests the user has left today. */
        private int remainingUsageToday;
        /** Whether the daily limit has been reached. */
        private boolean limitReached;
        /** True when the user is FREE/GRACE and premium features are locked. */
        private boolean premiumFeaturesLocked;
        /** Total daily request allowance for this tier. */
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
        /** User's current subscription tier. */
        private String tier;
        /** Requests used so far today. */
        private int usedToday;
        /** Requests remaining today. */
        private int remainingUsageToday;
        /** Total daily request allowance for this tier. */
        private int dailyLimit;
    }
}
