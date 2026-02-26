package com.amadProject.amadApp.domain.ai.controller;

import com.amadProject.amadApp.domain.ai.dto.AiChatDto;
import com.amadProject.amadApp.domain.ai.service.AiChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * REST controller for AI counseling chat.
 * All endpoints require authentication (enforced via SecurityConfiguration).
 */
@RestController
@RequestMapping("/ai-chat")
@RequiredArgsConstructor
@Slf4j
public class AiChatController {

    private final AiChatService aiChatService;

    /**
     * POST /ai-chat
     * Body: { "message": "..." }
     *
     * Returns a structured ChatResponse with status, AI reply, and remaining tokens.
     */
    @PostMapping
    public ResponseEntity<AiChatDto.ChatResponse> chat(
            @RequestBody AiChatDto.Request request) {

        String email = resolveEmail();
        log.debug("AI chat request from {}", email);

        AiChatDto.ChatResponse response = aiChatService.chat(
                email, request.getTextKo(), request.getHistoryKo(), request.getLimitVerses());
        return ResponseEntity.ok(response);
    }

    /**
     * GET /ai-chat/history
     * Returns the last 40 messages and today's token usage.
     */
    @GetMapping("/history")
    public ResponseEntity<AiChatDto.HistoryResponse> history() {
        String email = resolveEmail();
        return ResponseEntity.ok(aiChatService.getHistory(email));
    }

    // ──────────────────────────────────────────────────────────────────────

    private String resolveEmail() {
        return SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
    }
}
