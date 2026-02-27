package com.amadProject.amadApp.domain.billing.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "billing_subscription")
@Getter @Setter @NoArgsConstructor
public class BillingSubscription {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** FK to Member.id — stored as plain Long to avoid coupling to the Member entity. */
    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false)
    private Long planId;

    @Column(nullable = false)
    private String stripeSubscriptionId;

    /**
     * Mirrors Stripe subscription status:
     * active | trialing | past_due | unpaid | canceled | incomplete | incomplete_expired
     */
    @Column(nullable = false)
    private String status;

    /** UTC timestamp when the current billing period ends. */
    @Column
    private LocalDateTime currentPeriodEnd;

    @Column(nullable = false)
    private boolean cancelAtPeriodEnd = false;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime updatedAt = LocalDateTime.now();
}
