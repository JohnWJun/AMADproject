package com.amadProject.amadApp.domain.billing.service;

import com.amadProject.amadApp.common.exception.BusinessLogicException;
import com.amadProject.amadApp.common.exception.ExceptionCode;
import com.amadProject.amadApp.domain.billing.dto.BillingDto;
import com.amadProject.amadApp.domain.billing.entity.BillingCustomer;
import com.amadProject.amadApp.domain.billing.entity.BillingEvent;
import com.amadProject.amadApp.domain.billing.entity.BillingPlan;
import com.amadProject.amadApp.domain.billing.entity.BillingSubscription;
import com.amadProject.amadApp.domain.billing.repository.BillingCustomerRepository;
import com.amadProject.amadApp.domain.billing.repository.BillingEventRepository;
import com.amadProject.amadApp.domain.billing.repository.BillingPlanRepository;
import com.amadProject.amadApp.domain.billing.repository.BillingSubscriptionRepository;
import com.amadProject.amadApp.domain.member.entity.Member;
import com.amadProject.amadApp.domain.member.repository.MemberRepository;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Event;
import com.stripe.model.Invoice;
import com.stripe.model.StripeObject;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import com.stripe.param.checkout.SessionRetrieveParams;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.SubscriptionUpdateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
@RequiredArgsConstructor
@Slf4j
public class BillingService {

    @Value("${stripe.secret-key}")
    private String stripeSecretKey;

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    @Value("${stripe.price-id-monthly}")
    private String monthlyPriceId;

    @Value("${app.frontend-url}")
    private String frontendUrl;

    private final BillingPlanRepository planRepo;
    private final BillingCustomerRepository customerRepo;
    private final BillingSubscriptionRepository subscriptionRepo;
    private final BillingEventRepository eventRepo;
    private final MemberRepository memberRepo;

    // ── Initialisation ────────────────────────────────────────────────────

    @PostConstruct
    public void initStripe() {
        Stripe.apiKey = stripeSecretKey;
        log.info("Stripe SDK initialised");
    }

    /**
     * Seeds the billing_plan table with the monthly plan once on startup.
     * Idempotent: no-op if the plan already exists.
     */
    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void seedBillingPlan() {
        if (planRepo.findByPlanKey("monthly").isEmpty()) {
            BillingPlan plan = new BillingPlan();
            plan.setPlanKey("monthly");
            plan.setStripePriceId(monthlyPriceId);
            plan.setInterval("month");
            plan.setActive(true);
            planRepo.save(plan);
            log.info("Seeded billing plan: monthly (priceId={})", monthlyPriceId);
        }
    }

    // ── Public API ────────────────────────────────────────────────────────

    /**
     * Creates a Stripe Checkout Session for the given plan.
     * Returns the Stripe-hosted checkout URL.
     */
    @Transactional
    public String createCheckoutSession(String email, String planKey) {
        Member member = findMember(email);
        BillingPlan plan = planRepo.findByPlanKey(planKey)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BILLING_PLAN_NOT_FOUND));

        String customerId = getOrCreateStripeCustomer(member);

        try {
            SessionCreateParams params = SessionCreateParams.builder()
                    .setMode(SessionCreateParams.Mode.SUBSCRIPTION)
                    .setCustomer(customerId)
                    .addLineItem(SessionCreateParams.LineItem.builder()
                            .setPrice(plan.getStripePriceId())
                            .setQuantity(1L)
                            .build())
                    .setSuccessUrl(frontendUrl + "/billing/success?session_id={CHECKOUT_SESSION_ID}")
                    .setCancelUrl(frontendUrl + "/billing/cancel")
                    .build();

            Session session = Session.create(params);
            log.info("Checkout session created for userId={} planKey={}", member.getId(), planKey);
            return session.getUrl();

        } catch (StripeException e) {
            log.error("Stripe error creating checkout session for userId={}: {}", member.getId(), e.getMessage());
            throw new BusinessLogicException(ExceptionCode.STRIPE_API_ERROR);
        }
    }

    /**
     * Creates a Stripe Customer Portal session so the user can manage/cancel.
     * Returns the portal URL.
     */
    @Transactional(readOnly = true)
    public String createPortalSession(String email) {
        Member member = findMember(email);
        BillingCustomer customer = customerRepo.findByUserId(member.getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BILLING_CUSTOMER_NOT_FOUND));

        try {
            com.stripe.param.billingportal.SessionCreateParams params =
                    com.stripe.param.billingportal.SessionCreateParams.builder()
                            .setCustomer(customer.getStripeCustomerId())
                            .setReturnUrl(frontendUrl + "/billing")
                            .build();

            com.stripe.model.billingportal.Session session =
                    com.stripe.model.billingportal.Session.create(params);
            log.info("Portal session created for userId={}", member.getId());
            return session.getUrl();

        } catch (StripeException e) {
            log.error("Stripe error creating portal session for userId={}: {}", member.getId(), e.getMessage());
            throw new BusinessLogicException(ExceptionCode.STRIPE_API_ERROR);
        }
    }

    /** Returns the current subscription status for the authenticated user. */
    @Transactional(readOnly = true)
    public BillingDto.SubscriptionStatus getSubscriptionStatus(String email) {
        Member member = findMember(email);
        return subscriptionRepo.findByUserId(member.getId())
                .map(sub -> BillingDto.SubscriptionStatus.builder()
                        .status(sub.getStatus())
                        .currentPeriodEnd(sub.getCurrentPeriodEnd())
                        .cancelAtPeriodEnd(sub.isCancelAtPeriodEnd())
                        .hasPremiumAccess(isPremium(sub))
                        .planKey("monthly")
                        .build())
                .orElse(BillingDto.SubscriptionStatus.builder()
                        .status("none")
                        .hasPremiumAccess(false)
                        .build());
    }

    /**
     * Called from the success page immediately after checkout.
     * Retrieves the checkout session + subscription from Stripe and persists
     * BillingSubscription without relying on webhooks. Idempotent.
     */
    @Transactional
    public void syncAfterCheckout(String sessionId, String email) {
        Member member = findMember(email);
        try {
            SessionRetrieveParams params = SessionRetrieveParams.builder()
                    .addExpand("subscription")
                    .build();
            Session session = Session.retrieve(sessionId, params, null);

            // Security: verify the session belongs to this user's Stripe customer
            BillingCustomer customer = customerRepo.findByUserId(member.getId())
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BILLING_CUSTOMER_NOT_FOUND));
            if (!customer.getStripeCustomerId().equals(session.getCustomer())) {
                log.warn("Session customerId mismatch for userId={}", member.getId());
                throw new BusinessLogicException(ExceptionCode.ID_DOESNT_MATCH);
            }

            if (session.getSubscriptionObject() != null) {
                onSubscriptionUpsert(session.getSubscriptionObject());
                log.info("Synced subscription after checkout for userId={}", member.getId());
            }
        } catch (StripeException e) {
            log.error("Failed to sync after checkout for userId={}: {}", member.getId(), e.getMessage());
            throw new BusinessLogicException(ExceptionCode.STRIPE_API_ERROR);
        }
    }

    /**
     * Sets cancelAtPeriodEnd=true on the Stripe subscription.
     * The user keeps premium access until currentPeriodEnd.
     */
    @Transactional
    public void cancelSubscription(String email) {
        Member member = findMember(email);
        BillingSubscription bs = subscriptionRepo.findByUserId(member.getId())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.BILLING_CUSTOMER_NOT_FOUND));

        try {
            Subscription sub = Subscription.retrieve(bs.getStripeSubscriptionId());
            SubscriptionUpdateParams params = SubscriptionUpdateParams.builder()
                    .setCancelAtPeriodEnd(true)
                    .build();
            sub.update(params);

            // Optimistic local update — webhook will also confirm via subscription.updated
            bs.setCancelAtPeriodEnd(true);
            bs.setUpdatedAt(LocalDateTime.now());
            subscriptionRepo.save(bs);
            log.info("Subscription set to cancel at period end userId={}", member.getId());

        } catch (StripeException e) {
            log.error("Failed to cancel subscription for userId={}: {}", member.getId(), e.getMessage());
            throw new BusinessLogicException(ExceptionCode.STRIPE_API_ERROR);
        }
    }

    /**
     * Authorisation helper used by other services/controllers.
     * Returns true only when status is active/trialing AND period has not ended.
     */
    public boolean hasPremiumAccess(Long userId) {
        return subscriptionRepo.findByUserId(userId)
                .map(this::isPremium)
                .orElse(false);
    }

    // ── Webhook ───────────────────────────────────────────────────────────

    /**
     * Verifies the Stripe signature, deduplicates by event ID, then dispatches.
     * Called with the raw request bytes to guarantee HMAC verification integrity.
     */
    @Transactional
    public void handleWebhook(String rawPayload, String sigHeader) {
        Event event;
        try {
            event = Webhook.constructEvent(rawPayload, sigHeader, webhookSecret);
        } catch (SignatureVerificationException e) {
            log.warn("Invalid Stripe webhook signature");
            throw new BusinessLogicException(ExceptionCode.STRIPE_WEBHOOK_INVALID);
        }

        // Idempotency: skip already-processed events
        if (eventRepo.existsByStripeEventId(event.getId())) {
            log.info("Duplicate Stripe event skipped: {}", event.getId());
            return;
        }

        // Persist event ID before processing to block concurrent duplicates
        BillingEvent billingEvent = new BillingEvent();
        billingEvent.setStripeEventId(event.getId());
        billingEvent.setType(event.getType());
        eventRepo.save(billingEvent);

        log.info("Stripe event received: type={} id={}", event.getType(), event.getId());

        StripeObject obj = event.getDataObjectDeserializer().getObject().orElse(null);
        if (obj == null) {
            log.warn("Could not deserialize Stripe object for event {}", event.getId());
            return;
        }

        switch (event.getType()) {
            case "checkout.session.completed":
                onCheckoutCompleted((Session) obj);
                break;
            case "customer.subscription.created":
            case "customer.subscription.updated":
                onSubscriptionUpsert((Subscription) obj);
                break;
            case "customer.subscription.deleted":
                onSubscriptionDeleted((Subscription) obj);
                break;
            case "invoice.paid":
                onInvoicePaid((Invoice) obj);
                break;
            case "invoice.payment_failed":
                onInvoicePaymentFailed((Invoice) obj);
                break;
            default:
                log.debug("Unhandled Stripe event type: {}", event.getType());
        }
    }

    // ── Private webhook handlers ──────────────────────────────────────────

    private void onCheckoutCompleted(Session session) {
        if (!"subscription".equals(session.getMode())) return;
        // The subscription.created event will carry the actual subscription details.
        // Nothing additional to do here; log for traceability.
        log.info("Checkout completed: customerId={} subscriptionId={}",
                session.getCustomer(), session.getSubscription());
    }

    private void onSubscriptionUpsert(Subscription sub) {
        BillingCustomer customer = customerRepo.findByStripeCustomerId(sub.getCustomer())
                .orElse(null);
        if (customer == null) {
            log.warn("No BillingCustomer for Stripe customerId={}", sub.getCustomer());
            return;
        }

        Long userId = customer.getUserId();
        Long planId = planRepo.findAllByActive(true).stream()
                .findFirst().map(BillingPlan::getId).orElse(1L);

        BillingSubscription bs = subscriptionRepo.findByUserId(userId)
                .orElse(new BillingSubscription());

        bs.setUserId(userId);
        bs.setPlanId(planId);
        bs.setStripeSubscriptionId(sub.getId());
        bs.setStatus(sub.getStatus());
        bs.setCurrentPeriodEnd(
                LocalDateTime.ofEpochSecond(sub.getCurrentPeriodEnd(), 0, ZoneOffset.UTC));
        bs.setCancelAtPeriodEnd(Boolean.TRUE.equals(sub.getCancelAtPeriodEnd()));
        bs.setUpdatedAt(LocalDateTime.now());

        subscriptionRepo.save(bs);
        log.info("Subscription upserted userId={} status={}", userId, sub.getStatus());
    }

    private void onSubscriptionDeleted(Subscription sub) {
        customerRepo.findByStripeCustomerId(sub.getCustomer()).ifPresent(customer ->
                subscriptionRepo.findByUserId(customer.getUserId()).ifPresent(bs -> {
                    bs.setStatus("canceled");
                    bs.setUpdatedAt(LocalDateTime.now());
                    subscriptionRepo.save(bs);
                    log.info("Subscription canceled userId={}", customer.getUserId());
                })
        );
    }

    private void onInvoicePaid(Invoice invoice) {
        if (invoice.getSubscription() == null) return;
        customerRepo.findByStripeCustomerId(invoice.getCustomer()).ifPresent(customer ->
                subscriptionRepo.findByUserId(customer.getUserId()).ifPresent(bs -> {
                    bs.setStatus("active");
                    bs.setUpdatedAt(LocalDateTime.now());
                    subscriptionRepo.save(bs);
                    log.info("Invoice paid — subscription active userId={}", customer.getUserId());
                })
        );
    }

    private void onInvoicePaymentFailed(Invoice invoice) {
        customerRepo.findByStripeCustomerId(invoice.getCustomer()).ifPresent(customer ->
                subscriptionRepo.findByUserId(customer.getUserId()).ifPresent(bs -> {
                    bs.setStatus("past_due");
                    bs.setUpdatedAt(LocalDateTime.now());
                    subscriptionRepo.save(bs);
                    log.warn("Invoice payment failed — status=past_due userId={}", customer.getUserId());
                })
        );
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    private Member findMember(String email) {
        return memberRepo.findByEmail(email)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    @Transactional
    protected String getOrCreateStripeCustomer(Member member) {
        return customerRepo.findByUserId(member.getId())
                .map(BillingCustomer::getStripeCustomerId)
                .orElseGet(() -> {
                    try {
                        CustomerCreateParams params = CustomerCreateParams.builder()
                                .setEmail(member.getEmail())
                                .setName(member.getNickname())
                                .build();
                        Customer stripeCustomer = Customer.create(params);

                        BillingCustomer bc = new BillingCustomer();
                        bc.setUserId(member.getId());
                        bc.setStripeCustomerId(stripeCustomer.getId());
                        customerRepo.save(bc);

                        log.info("Stripe customer created userId={} customerId={}",
                                member.getId(), stripeCustomer.getId());
                        return stripeCustomer.getId();

                    } catch (StripeException e) {
                        log.error("Failed to create Stripe customer for userId={}: {}", member.getId(), e.getMessage());
                        throw new BusinessLogicException(ExceptionCode.STRIPE_API_ERROR);
                    }
                });
    }

    private boolean isPremium(BillingSubscription sub) {
        String status = sub.getStatus();
        boolean statusOk = "active".equals(status) || "trialing".equals(status);
        boolean periodValid = sub.getCurrentPeriodEnd() == null
                || sub.getCurrentPeriodEnd().isAfter(LocalDateTime.now());
        return statusOk && periodValid;
    }
}
