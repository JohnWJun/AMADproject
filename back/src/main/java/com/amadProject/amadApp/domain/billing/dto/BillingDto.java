package com.amadProject.amadApp.domain.billing.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class BillingDto {

    @Getter @Setter
    public static class CheckoutRequest {
        private String planKey;   // "monthly"
    }

    @Getter @Builder
    public static class CheckoutResponse {
        private String url;
    }

    @Getter @Builder
    public static class PortalResponse {
        private String url;
    }

    @Getter @Builder
    public static class SubscriptionStatus {
        /** Stripe status string: active | trialing | past_due | unpaid | canceled | none */
        private String status;

        @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
        private LocalDateTime currentPeriodEnd;

        private boolean cancelAtPeriodEnd;

        /** true only when status is active or trialing AND period has not ended */
        private boolean hasPremiumAccess;

        private String planKey;
    }
}
