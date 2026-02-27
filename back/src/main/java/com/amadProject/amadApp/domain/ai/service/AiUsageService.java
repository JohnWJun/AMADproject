package com.amadProject.amadApp.domain.ai.service;

import com.amadProject.amadApp.domain.ai.entity.AiUsageLog;
import com.amadProject.amadApp.domain.ai.repository.AiUsageLogRepository;
import com.amadProject.amadApp.domain.billing.config.TierProperties;
import com.amadProject.amadApp.domain.billing.config.TierSettings;
import com.amadProject.amadApp.domain.billing.enums.UserTier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Manages per-user daily AI request counts.
 *
 * Replaces the old token-based quota with a simpler request-count model
 * that is differentiated by subscription tier via TierProperties.
 */
@Service
@RequiredArgsConstructor
public class AiUsageService {

    private final AiUsageLogRepository usageLogRepo;
    private final TierProperties tierProperties;

    // ── Read ──────────────────────────────────────────────────────────────

    /** How many requests this user has made today (since midnight). */
    @Transactional(readOnly = true)
    public int getUsedToday(Long userId) {
        return usageLogRepo.countByUserIdSince(userId, todayStart());
    }

    /** How many requests remain today for the user's current tier. */
    @Transactional(readOnly = true)
    public int getRemainingToday(Long userId, UserTier tier) {
        TierSettings settings = tierProperties.getSettings(tier);
        int used = getUsedToday(userId);
        return Math.max(0, settings.getDailyRequests() - used);
    }

    /** Returns true if the user has not yet hit their daily limit. */
    @Transactional(readOnly = true)
    public boolean canUseAi(Long userId, UserTier tier) {
        return getRemainingToday(userId, tier) > 0;
    }

    // ── Write ─────────────────────────────────────────────────────────────

    /** Appends one counseling request record for the user. */
    @Transactional
    public void recordUsage(Long userId) {
        usageLogRepo.save(AiUsageLog.counsel(userId));
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private LocalDateTime todayStart() {
        return LocalDate.now().atStartOfDay();
    }
}
