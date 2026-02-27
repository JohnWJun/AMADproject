package com.amadProject.amadApp.domain.billing.controller;

import com.amadProject.amadApp.domain.billing.dto.BillingDto;
import com.amadProject.amadApp.domain.billing.service.BillingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@RestController
@RequestMapping("/billing")
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    /** POST /billing/checkout-session — creates a Stripe Checkout session and returns the URL */
    @PostMapping("/checkout-session")
    public ResponseEntity<BillingDto.CheckoutResponse> createCheckoutSession(
            @RequestBody BillingDto.CheckoutRequest request) {
        String email = getAuthenticatedEmail();
        String url = billingService.createCheckoutSession(email, request.getPlanKey());
        return ResponseEntity.ok(BillingDto.CheckoutResponse.builder().url(url).build());
    }

    /** POST /billing/portal — creates a Stripe Customer Portal session and returns the URL */
    @PostMapping("/portal")
    public ResponseEntity<BillingDto.PortalResponse> createPortalSession() {
        String email = getAuthenticatedEmail();
        String url = billingService.createPortalSession(email);
        return ResponseEntity.ok(BillingDto.PortalResponse.builder().url(url).build());
    }

    /** GET /billing/me — returns the current user's subscription status */
    @GetMapping("/me")
    public ResponseEntity<BillingDto.SubscriptionStatus> getSubscriptionStatus() {
        String email = getAuthenticatedEmail();
        BillingDto.SubscriptionStatus status = billingService.getSubscriptionStatus(email);
        return ResponseEntity.ok(status);
    }

    /**
     * POST /billing/sync?sessionId=xxx
     * Called from the success page right after Stripe checkout.
     * Writes BillingSubscription to DB without relying on webhooks.
     */
    @PostMapping("/sync")
    public ResponseEntity<Void> syncAfterCheckout(@RequestParam String sessionId) {
        String email = getAuthenticatedEmail();
        billingService.syncAfterCheckout(sessionId, email);
        return ResponseEntity.noContent().build();
    }

    /** DELETE /billing/subscription — sets cancelAtPeriodEnd=true; user keeps access until period ends */
    @DeleteMapping("/subscription")
    public ResponseEntity<Void> cancelSubscription() {
        String email = getAuthenticatedEmail();
        billingService.cancelSubscription(email);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /billing/webhook — Stripe webhook endpoint.
     * Must use raw bytes from the request body to preserve HMAC integrity.
     * Permitted without authentication in SecurityConfiguration.
     */
    @PostMapping(value = "/webhook", consumes = "application/json")
    public ResponseEntity<String> handleWebhook(
            HttpServletRequest request,
            @RequestHeader("Stripe-Signature") String sigHeader) throws IOException {
        byte[] bytes = request.getInputStream().readAllBytes();
        String payload = new String(bytes, StandardCharsets.UTF_8);
        billingService.handleWebhook(payload, sigHeader);
        return ResponseEntity.ok("received");
    }

    private String getAuthenticatedEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return auth.getName();
    }
}
