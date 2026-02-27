package com.amadProject.amadApp.domain.ai.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Records every AI counseling request per user.
 * Used for daily request-count quotas (replaces the old token-based system).
 *
 * Index on (user_id, used_at) supports efficient "count since midnight" queries.
 * Rows are append-only — never updated or deleted during normal operation.
 * Old rows may be purged periodically by a maintenance job if needed.
 */
@Entity
@Table(
    name = "ai_usage_log",
    indexes = @Index(name = "idx_usage_user_date", columnList = "user_id, used_at")
)
@Getter
@Setter
@NoArgsConstructor
public class AiUsageLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "used_at", nullable = false)
    private LocalDateTime usedAt;

    /** Request type for future multi-feature tracking (e.g. "counsel", "summary"). */
    @Column(name = "request_type", nullable = false, length = 50)
    private String requestType;

    public static AiUsageLog counsel(Long userId) {
        AiUsageLog log = new AiUsageLog();
        log.userId = userId;
        log.usedAt = LocalDateTime.now();
        log.requestType = "counsel";
        return log;
    }
}
