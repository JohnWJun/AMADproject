package com.amadProject.amadApp.domain.billing.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "billing_plan")
@Getter @Setter @NoArgsConstructor
public class BillingPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String planKey;           // e.g. "monthly"

    @Column(nullable = false)
    private String stripePriceId;     // Stripe Price ID

    @Column(name = "billing_interval", nullable = false)
    private String interval;          // "month"

    @Column(nullable = false)
    private boolean active = true;
}
