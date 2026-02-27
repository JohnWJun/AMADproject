package com.amadProject.amadApp.domain.billing.repository;

import com.amadProject.amadApp.domain.billing.entity.BillingEvent;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingEventRepository extends JpaRepository<BillingEvent, Long> {
    boolean existsByStripeEventId(String stripeEventId);
}
