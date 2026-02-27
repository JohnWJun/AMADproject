package com.amadProject.amadApp.domain.billing.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Idempotency table: every processed Stripe event ID is stored here.
 * The UNIQUE constraint on stripe_event_id prevents double-processing.
 */
@Entity
@Table(name = "billing_event")
@Getter @Setter @NoArgsConstructor
public class BillingEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String stripeEventId;

    @Column(nullable = false)
    private String type;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
