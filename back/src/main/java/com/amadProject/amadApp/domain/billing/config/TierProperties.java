package com.amadProject.amadApp.domain.billing.config;

import com.amadProject.amadApp.domain.billing.enums.UserTier;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * Binds the "ai.tier" section of application.yml.
 *
 * Example yml shape:
 *
 *   ai:
 *     tier:
 *       grace-period-days: 3
 *       settings:
 *         FREE:
 *           daily-requests: 3
 *           max-verses: 2
 *           history-enabled: false
 *           max-history-turns: 0
 *         PREMIUM:
 *           ...
 *
 * Scalable: adding a new tier (PRO, TEAM) requires only a yml entry
 * and a new UserTier enum value — no service code changes needed.
 */
@Component
@ConfigurationProperties(prefix = "ai.tier")
@Getter
@Setter
public class TierProperties {

    /** Grace window after past_due before dropping to FREE. */
    private int gracePeriodDays = 3;

    /** Per-tier configuration keyed by UserTier name (e.g. "FREE", "PREMIUM"). */
    private Map<String, TierSettings> settings = new HashMap<>();

    /**
     * Returns the settings for the given tier.
     * Falls back to FREE settings if the tier is not configured.
     */
    public TierSettings getSettings(UserTier tier) {
        TierSettings ts = settings.get(tier.name());
        if (ts != null) return ts;
        // Fallback: try FREE, then hardcoded safe defaults
        ts = settings.get(UserTier.FREE.name());
        if (ts != null) return ts;
        return safeDefaults();
    }

    private TierSettings safeDefaults() {
        TierSettings ts = new TierSettings();
        ts.setDailyRequests(3);
        ts.setMaxVerses(2);
        ts.setHistoryEnabled(false);
        ts.setMaxHistoryTurns(0);
        return ts;
    }
}
