package com.amadProject.amadApp.domain.billing.service;

import com.amadProject.amadApp.domain.billing.config.TierProperties;
import com.amadProject.amadApp.domain.billing.entity.BillingSubscription;
import com.amadProject.amadApp.domain.billing.enums.UserTier;
import com.amadProject.amadApp.domain.billing.repository.BillingSubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Set;

/**
 * Single-responsibility service for determining a user's current subscription tier.
 *
 * Rules:
 *   PREMIUM   → status in (active, trialing) AND period not ended AND !cancelAtPeriodEnd
 *   CANCELING → status in (active, trialing) AND period not ended AND cancelAtPeriodEnd
 *   GRACE     → past_due AND within configurable grace window after periodEnd
 *   FREE      → all other cases
 *
 * Designed for easy extension: add a new UserTier value + yml entry to support
 * additional plans (PRO, TEAM) without modifying this class.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class SubscriptionService {

    private static final Set<String> ACTIVE_STATUSES = Set.of("active", "trialing");

    private final BillingSubscriptionRepository subscriptionRepo;
    private final TierProperties tierProperties;

    /**
     * Returns the effective tier for the given user at this instant.
     * Returns FREE immediately if no subscription record exists.
     */
    @Transactional(readOnly = true)
    public UserTier getUserTier(Long userId) {
        return subscriptionRepo.findByUserId(userId)
                .map(this::determineTier)
                .orElse(UserTier.FREE);
    }

    // ── Private ──────────────────────────────────────────────────────────

    private UserTier determineTier(BillingSubscription sub) {
        String status = sub.getStatus();
        LocalDateTime now = LocalDateTime.now();

        // Active or trialing
        if (ACTIVE_STATUSES.contains(status)) {
            // Edge-case: Stripe hasn't sent the deletion event yet but period is already over
            if (sub.getCurrentPeriodEnd() != null && sub.getCurrentPeriodEnd().isBefore(now)) {
                log.debug("Subscription userId={} period expired despite active status — treating as FREE", sub.getUserId());
                return UserTier.FREE;
            }
            return sub.isCancelAtPeriodEnd() ? UserTier.CANCELING : UserTier.PREMIUM;
        }

        // Past-due: grant a configurable grace window
        if ("past_due".equals(status) && sub.getCurrentPeriodEnd() != null) {
            LocalDateTime graceEnd = sub.getCurrentPeriodEnd()
                    .plusDays(tierProperties.getGracePeriodDays());
            if (now.isBefore(graceEnd)) {
                return UserTier.GRACE;
            }
        }

        return UserTier.FREE;
    }
}
