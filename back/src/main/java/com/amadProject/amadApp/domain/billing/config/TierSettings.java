package com.amadProject.amadApp.domain.billing.config;

import lombok.Getter;
import lombok.Setter;

/**
 * Per-tier AI feature settings bound from application.yml.
 * Add new fields here to support future plan differentiation
 * (e.g., PRO, TEAM) without changing any service code.
 */
@Getter
@Setter
public class TierSettings {

    /** Maximum AI counseling requests allowed per calendar day. */
    private int dailyRequests;

    /** Maximum number of Bible verses the AI may cite per response. */
    private int maxVerses;

    /** Whether the AI receives previous conversation turns as context. */
    private boolean historyEnabled;

    /**
     * Maximum number of previous user-message turns to send as history.
     * Ignored when historyEnabled = false.
     */
    private int maxHistoryTurns;
}
