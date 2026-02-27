package com.amadProject.amadApp.domain.ai.service;

import com.amadProject.amadApp.common.webClient.service.BibleAiClient;
import com.amadProject.amadApp.domain.ai.dto.AiChatDto;
import com.amadProject.amadApp.domain.billing.config.TierProperties;
import com.amadProject.amadApp.domain.billing.config.TierSettings;
import com.amadProject.amadApp.domain.billing.enums.UserTier;
import com.amadProject.amadApp.domain.billing.service.SubscriptionService;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

/**
 * Orchestrates the AI counseling chat flow:
 *   1. Input validation and sanitization
 *   2. Rate limiting (in-memory, per user)
 *   3. Member lookup + subscription tier resolution
 *   4. Daily request-count quota check (AiUsageService)
 *   5. Build tier-aware history
 *   6. AI network call (BibleAiClient — no DB connection held)
 *   7. Record usage + persist exchange (AiChatPersistenceService)
 *   8. Build structured response with tier metadata
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
    private final AiUsageService aiUsageService;
    private final SubscriptionService subscriptionService;
    private final TierProperties tierProperties;
    private final BibleAiClient bibleAiClient;
    private final ObjectMapper objectMapper;

    // ── In-memory rate limiter: email → time of last accepted request ──────
    private final ConcurrentHashMap<String, Instant> lastRequestMap = new ConcurrentHashMap<>();

    // ══════════════════════════════════════════════════════════════════════
    //  Public API
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Main entry point: validate → rate limit → tier check → quota check → AI call → persist.
     */
    public AiChatDto.ChatResponse chat(String email, String rawMessage,
                                       List<String> history) {

        // ── 1. Sanitize & validate ────────────────────────────────────────
        String message = sanitize(rawMessage);
        if (message.isEmpty()) {
            return errorResponse("메시지를 입력해주세요.", null, -1, -1, false);
        }
        if (message.length() > MAX_INPUT_LENGTH) {
            return errorResponse(
                    "메시지는 최대 " + MAX_INPUT_LENGTH + "자까지 입력할 수 있습니다.",
                    null, -1, -1, false);
        }

        // ── 2. Rate limit ────────────────────────────────────────────────
        Instant now = Instant.now();
        Instant last = lastRequestMap.get(email);
        if (last != null && Duration.between(last, now).getSeconds() < MIN_INTERVAL_SECONDS) {
            long waitSec = MIN_INTERVAL_SECONDS - Duration.between(last, now).getSeconds();
            return rateLimitedResponse(
                    "메시지를 너무 빠르게 전송하고 있습니다. " + waitSec + "초 후 다시 시도해주세요.",
                    null, -1, -1, false);
        }
        lastRequestMap.put(email, now);

        // ── 3. Member lookup + tier resolution ────────────────────────────
        Member member = persistenceService.findMember(email);
        UserTier tier = subscriptionService.getUserTier(member.getId());
        TierSettings settings = tierProperties.getSettings(tier);

        // ── 4. Daily request-count quota check ────────────────────────────
        int remaining = aiUsageService.getRemainingToday(member.getId(), tier);
        if (remaining <= 0) {
            return limitExceededResponse(
                    "오늘의 AI 상담 한도(" + settings.getDailyRequests()
                            + "회)를 초과했습니다. 내일 다시 시도해주세요.",
                    tier, 0, settings.getDailyRequests(),
                    isPremiumFeaturesLocked(tier));
        }

        // ── 5. Build tier-aware history ───────────────────────────────────
        List<String> effectiveHistory = buildHistory(history, settings);

        // ── 6. Call AI microservice (no DB connection held here) ──────────
        String rawAiResponse;
        try {
            rawAiResponse = bibleAiClient.counsel(message, effectiveHistory, tier, settings)
                    .timeout(AI_TIMEOUT)
                    .block();
        } catch (Exception ex) {
            log.error("AI service call failed for {}: {}", email, ex.getMessage());
            lastRequestMap.remove(email);
            return errorResponse(
                    "AI 서비스에 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
                    tier, remaining, settings.getDailyRequests(),
                    isPremiumFeaturesLocked(tier));
        }

        if (rawAiResponse == null || rawAiResponse.isBlank()) {
            lastRequestMap.remove(email);
            return errorResponse(
                    "AI 서비스에서 응답을 받지 못했습니다. 잠시 후 다시 시도해주세요.",
                    tier, remaining, settings.getDailyRequests(),
                    isPremiumFeaturesLocked(tier));
        }

        // ── 7. Parse AI response ──────────────────────────────────────────
        String aiText = extractCounselingText(rawAiResponse);

        // ── 8. Record usage + persist exchange ────────────────────────────
        try {
            aiUsageService.recordUsage(member.getId());
        } catch (Exception ex) {
            log.error("Failed to record AI usage for memberId={}: {}", member.getId(), ex.getMessage());
        }

        try {
            int dummyTokens = estimateTokens(message, aiText);
            persistenceService.persistExchange(member.getId(), message, aiText, dummyTokens);
        } catch (Exception ex) {
            log.error("Failed to persist AI exchange for memberId={}: {}", member.getId(), ex.getMessage());
        }

        int newRemaining = Math.max(0, remaining - 1);
        return AiChatDto.ChatResponse.builder()
                .status("ok")
                .message(aiText)
                .tier(tier.name())
                .remainingUsageToday(newRemaining)
                .limitReached(newRemaining == 0)
                .premiumFeaturesLocked(isPremiumFeaturesLocked(tier))
                .dailyLimit(settings.getDailyRequests())
                .build();
    }

    /** Delegates history fetch to persistence layer. */
    public AiChatDto.HistoryResponse getHistory(String email) {
        Member member = persistenceService.findMember(email);
        UserTier tier = subscriptionService.getUserTier(member.getId());
        TierSettings settings = tierProperties.getSettings(tier);
        int used = aiUsageService.getUsedToday(member.getId());
        int remaining = Math.max(0, settings.getDailyRequests() - used);

        return persistenceService.getHistory(email, tier.name(), used, remaining, settings.getDailyRequests());
    }

    // ══════════════════════════════════════════════════════════════════════
    //  Helpers
    // ══════════════════════════════════════════════════════════════════════

    /**
     * Returns true when the tier does not get full premium AI features.
     * PREMIUM and CANCELING have full access until their period ends.
     */
    private boolean isPremiumFeaturesLocked(UserTier tier) {
        return tier == UserTier.FREE || tier == UserTier.GRACE;
    }

    /**
     * Trims or empties history based on tier settings.
     * FREE/GRACE tiers get no history context (saves tokens, matches their limit).
     */
    private List<String> buildHistory(List<String> raw, TierSettings settings) {
        if (!settings.isHistoryEnabled() || raw == null || raw.isEmpty()) {
            return List.of();
        }
        int maxTurns = settings.getMaxHistoryTurns();
        if (maxTurns <= 0 || raw.size() <= maxTurns) {
            return raw;
        }
        // Keep only the most recent maxTurns entries
        return raw.subList(raw.size() - maxTurns, raw.size());
    }

    /**
     * Estimates token count for persistence compatibility (legacy field on Member).
     * No longer used for quota enforcement.
     */
    static int estimateTokens(String prompt, String response) {
        int totalChars = prompt.length() + response.length();
        return Math.max(10, totalChars / 2);
    }

    private String sanitize(String raw) {
        if (raw == null) return "";
        return HTML_PATTERN.matcher(raw.trim()).replaceAll("").trim();
    }

    /**
     * Parses the JSON envelope returned by the FastAPI /counsel endpoint.
     * Expected format: { "answer_ko": "..." }
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
            return json;
        } catch (Exception ex) {
            return json.trim();
        }
    }

    private AiChatDto.ChatResponse errorResponse(String message, UserTier tier,
                                                  int remaining, int dailyLimit,
                                                  boolean premiumLocked) {
        return AiChatDto.ChatResponse.builder()
                .status("error")
                .message(message)
                .tier(tier != null ? tier.name() : null)
                .remainingUsageToday(Math.max(0, remaining))
                .limitReached(false)
                .premiumFeaturesLocked(premiumLocked)
                .dailyLimit(dailyLimit)
                .build();
    }

    private AiChatDto.ChatResponse limitExceededResponse(String message, UserTier tier,
                                                          int remaining, int dailyLimit,
                                                          boolean premiumLocked) {
        return AiChatDto.ChatResponse.builder()
                .status("limit_exceeded")
                .message(message)
                .tier(tier != null ? tier.name() : null)
                .remainingUsageToday(0)
                .limitReached(true)
                .premiumFeaturesLocked(premiumLocked)
                .dailyLimit(dailyLimit)
                .build();
    }

    private AiChatDto.ChatResponse rateLimitedResponse(String message, UserTier tier,
                                                        int remaining, int dailyLimit,
                                                        boolean premiumLocked) {
        return AiChatDto.ChatResponse.builder()
                .status("rate_limited")
                .message(message)
                .tier(tier != null ? tier.name() : null)
                .remainingUsageToday(Math.max(0, remaining))
                .limitReached(false)
                .premiumFeaturesLocked(premiumLocked)
                .dailyLimit(dailyLimit)
                .build();
    }
}
