package com.amadProject.amadApp.domain.billing.repository;

import com.amadProject.amadApp.domain.billing.entity.BillingSubscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BillingSubscriptionRepository extends JpaRepository<BillingSubscription, Long> {
    Optional<BillingSubscription> findByUserId(Long userId);
    Optional<BillingSubscription> findByStripeSubscriptionId(String stripeSubscriptionId);
}
