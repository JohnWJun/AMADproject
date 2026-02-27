package com.amadProject.amadApp.domain.billing.repository;

import com.amadProject.amadApp.domain.billing.entity.BillingCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BillingCustomerRepository extends JpaRepository<BillingCustomer, Long> {
    Optional<BillingCustomer> findByUserId(Long userId);
    Optional<BillingCustomer> findByStripeCustomerId(String stripeCustomerId);
}
