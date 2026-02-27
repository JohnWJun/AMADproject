package com.amadProject.amadApp.domain.ai.repository;

import com.amadProject.amadApp.domain.ai.entity.AiUsageLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;

public interface AiUsageLogRepository extends JpaRepository<AiUsageLog, Long> {

    /**
     * Counts how many AI requests the user has made since the given timestamp.
     * Used to calculate remaining daily quota.
     */
    @Query("SELECT COUNT(l) FROM AiUsageLog l WHERE l.userId = :userId AND l.usedAt >= :since")
    int countByUserIdSince(@Param("userId") Long userId, @Param("since") LocalDateTime since);
}
