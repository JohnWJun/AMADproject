package com.amadProject.amadApp.domain.billing.enums;

/**
 * Subscription tier for a user at a given point in time.
 *
 * PREMIUM   - active/trialing, period has not ended, not canceling
 * CANCELING - active/trialing, period has not ended, cancel_at_period_end=true
 *             → full premium access until period end
 * GRACE     - past_due within the configured grace window (default 3 days)
 *             → reduced but non-zero access
 * FREE      - everything else (no subscription, canceled, expired, etc.)
 */
public enum UserTier {
    FREE,
    PREMIUM,
    GRACE,
    CANCELING
}
