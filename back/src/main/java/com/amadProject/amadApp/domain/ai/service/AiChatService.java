package com.amadProject.amadApp.domain.ai.service;

import com.amadProject.amadApp.common.webClient.service.BibleAiClient;
import com.amadProject.amadApp.domain.ai.dto.AiChatDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

/**
 * Orchestrates the AI counseling chat flow:
 *   1. Input validation and sanitization
 *   2. Rate limiting (in-memory, per user)
 *   3. Daily token quota check  (delegated to AiChatPersistenceService)
 *   4. AI network call         (BibleAiClient — no DB connection held)
 *   5. Persist exchange + token usage (delegated to AiChatPersistenceService)
 *   6. Build structured response
 *
 * This class is intentionally NOT @Transactional so the DB connection
 * is freed between the "prepare" and "persist" phases.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AiChatService {

    // ── Constants ──────────────────────────────────────────────────────────
    static final int MAX_INPUT_LENGTH       = 1_000;
    private static final int MIN_INTERVAL_SECONDS = 5;
    private static final Duration AI_TIMEOUT      = Duration.ofSeconds(25);
    private static final Pattern HTML_PATTERN     = Pattern.compile("<[^>]+>");

    // ── Dependencies ───────────────────────────────────────────────────────
    private final AiChatPersistenceService persistenceService;
    private final BibleAiClient bibleAiClient;
    private final ObjectMapper objectMapper;   // Spring Boot auto-configures this bean

    // ── In-memory rate limiter: email → time of last accepted request ────────
    // Using email (String) as key avoids an extra DB lookup just for member ID.
    private final ConcurrentHashMap<String, Instant> lastRequestMap = new ConcurrentHashMap<>();

    // ══════════════════════════════════════════════════════════════════════
    //  Public API
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Main entry point: validate → rate limit → quota check → AI call → persist.
     */
    public AiChatDto.ChatResponse chat(String email, String rawMessage,
                                       java.util.List<String> history, int limitVerses) {

        // ── 1. Sanitize & validate ────────────────────────────────────────
        String message = sanitize(rawMessage);
        if (message.isEmpty()) {
            return errorResponse("메시지를 입력해주세요.", 0);
        }
        if (message.length() > MAX_INPUT_LENGTH) {
            return errorResponse(
                    "메시지는 최대 " + MAX_INPUT_LENGTH + "자까지 입력할 수 있습니다.", 0);
        }

        // ── 2. Rate limit ────────────────────────────────────────────────
        // We need the member ID for the rate-limiter key but want to avoid
        // a DB call just for this. Use email string as the map key instead.
        Instant now = Instant.now();
        Instant last = lastRequestMap.get(email);
        if (last != null && Duration.between(last, now).getSeconds() < MIN_INTERVAL_SECONDS) {
            long waitSec = MIN_INTERVAL_SECONDS - Duration.between(last, now).getSeconds();
            return rateLimitedResponse(
                    "메시지를 너무 빠르게 전송하고 있습니다. " + waitSec + "초 후 다시 시도해주세요.", 0);
        }
        lastRequestMap.put(email, now);

        // ── 3. Quota check (DB, transactional) ───────────────────────────
        AiChatPersistenceService.TokenCheckResult prep;
        try {
            prep = persistenceService.checkAndReserve(email);
        } catch (IllegalStateException ex) {
            if ("limit_exceeded".equals(ex.getMessage())) {
                return limitExceededResponse(
                        "오늘의 AI 상담 한도(" + AiChatPersistenceService.DAILY_TOKEN_LIMIT
                                + " 토큰)를 초과했습니다. 내일 다시 시도해주세요.", 0);
            }
            log.error("Unexpected quota check error for {}: {}", email, ex.getMessage());
            return errorResponse("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", 0);
        }

        // ── 4. Call AI microservice (no DB connection held here) ──────────
        String rawAiResponse;
        try {
            rawAiResponse = bibleAiClient.counsel(message, history, limitVerses)
                    .timeout(AI_TIMEOUT)
                    .block();
        } catch (Exception ex) {
            log.error("AI service call failed for {}: {}", email, ex.getMessage());
            // Undo rate-limit slot on AI failure so the user can retry sooner
            lastRequestMap.remove(email);
            return errorResponse(
                    "AI 서비스에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.", prep.getRemaining());
        }

        if (rawAiResponse == null || rawAiResponse.isBlank()) {
            lastRequestMap.remove(email);
            return errorResponse(
                    "AI 서비스에서 응답을 받지 못했습니다. 잠시 후 다시 시도해주세요.", prep.getRemaining());
        }

        // ── 5. Parse AI response ──────────────────────────────────────────
        String aiText = extractCounselingText(rawAiResponse);

        // ── 6. Estimate tokens & persist (DB, transactional) ─────────────
        int tokensUsed = estimateTokens(message, aiText);
        try {
            persistenceService.persistExchange(prep.getMemberId(), message, aiText, tokensUsed);
        } catch (Exception ex) {
            // Messages still shown to the user even if persistence fails;
            // next quota check will be off by tokensUsed — acceptable trade-off.
            log.error("Failed to persist AI exchange for memberId={}: {}", prep.getMemberId(), ex.getMessage());
        }

        int newRemaining = Math.max(0, prep.getRemaining() - tokensUsed);
        return AiChatDto.ChatResponse.builder()
                .status("ok")
                .message(aiText)
                .remainingTokens(newRemaining)
                .dailyLimit(AiChatPersistenceService.DAILY_TOKEN_LIMIT)
                .build();
    }

    /** Delegates history fetch to persistence layer. */
    public AiChatDto.HistoryResponse getHistory(String email) {
        return persistenceService.getHistory(email);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  Token estimation
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Estimates token consumption for the user + assistant turn.
     *
     * Rationale:
     *  - OpenAI tokenizes Korean text at roughly 1.5–2 tokens per character
     *    (each Korean syllable is one UTF-16 code unit but 2–3 BPE tokens).
     *  - We use (total characters / 2) as a conservative overestimate.
     *  - A minimum of 10 tokens is enforced to cover fixed prompt overhead.
     *
     * Future: swap this with a real tiktoken call if tighter billing accuracy
     * is required, or use the actual usage field from the OpenAI API response.
     */
    static int estimateTokens(String prompt, String response) {
        int totalChars = prompt.length() + response.length();
        return Math.max(10, totalChars / 2);
    }

    // ══════════════════════════════════════════════════════════════════════
    //  Private helpers
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Strips HTML tags and trims whitespace.
     */
    private String sanitize(String raw) {
        if (raw == null) return "";
        return HTML_PATTERN.matcher(raw.trim()).replaceAll("").trim();
    }

    /**
     * Parses the JSON envelope returned by the FastAPI /counsel endpoint.
     *
     * Expected format: { "counsel": "...", "verses": [...] }
     * Falls back to returning the raw string on parse failure.
     */
    private String extractCounselingText(String json) {
        try {
            JsonNode root = objectMapper.readTree(json);
            if (root.has("answer_ko") && !root.get("answer_ko").isNull()) {
                return root.get("answer_ko").asText().trim();
            }
            if (root.has("error")) {
                log.warn("AI service returned error field: {}", root.get("error").asText());
                return "AI 서비스에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
            }
            // Unknown structure — return the raw JSON as text
            return json;
        } catch (Exception ex) {
            // Not JSON (plain text response) — return as-is
            return json.trim();
        }
    }

    private AiChatDto.ChatResponse errorResponse(String message, int remaining) {
        return AiChatDto.ChatResponse.builder()
                .status("error")
                .message(message)
                .remainingTokens(remaining)
                .dailyLimit(AiChatPersistenceService.DAILY_TOKEN_LIMIT)
                .build();
    }

    private AiChatDto.ChatResponse limitExceededResponse(String message, int remaining) {
        return AiChatDto.ChatResponse.builder()
                .status("limit_exceeded")
                .message(message)
                .remainingTokens(remaining)
                .dailyLimit(AiChatPersistenceService.DAILY_TOKEN_LIMIT)
                .build();
    }

    private AiChatDto.ChatResponse rateLimitedResponse(String message, int remaining) {
        return AiChatDto.ChatResponse.builder()
                .status("rate_limited")
                .message(message)
                .remainingTokens(remaining)
                .dailyLimit(AiChatPersistenceService.DAILY_TOKEN_LIMIT)
                .build();
    }
}
