package com.amadProject.amadApp.domain.billing.repository;

import com.amadProject.amadApp.domain.billing.entity.BillingPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BillingPlanRepository extends JpaRepository<BillingPlan, Long> {
    Optional<BillingPlan> findByPlanKey(String planKey);
    List<BillingPlan> findAllByActive(boolean active);
}
