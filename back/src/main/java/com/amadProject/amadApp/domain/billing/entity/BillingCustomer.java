package com.amadProject.amadApp.domain.billing.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "billing_customer")
@Getter @Setter @NoArgsConstructor
public class BillingCustomer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false, unique = true)
    private String stripeCustomerId;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
