'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export type SubscriptionStatus = {
    status: string;                // 'active' | 'trialing' | 'past_due' | 'canceled' | 'none'
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    hasPremiumAccess: boolean;
    planKey: string | null;
};

export const getSubscriptionStatus = ({ accessToken, refreshToken }: TokenProps) =>
    apiFetch<SubscriptionStatus>('/billing/me', {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const createCheckoutSession = ({
    planKey, accessToken, refreshToken,
}: { planKey: string } & TokenProps) =>
    apiFetch<{ url: string }>('/billing/checkout-session', {
        method: 'POST',
        body: JSON.stringify({ planKey }),
        accessToken,
        refreshToken,
    });

export const createPortalSession = ({ accessToken, refreshToken }: TokenProps) =>
    apiFetch<{ url: string }>('/billing/portal', {
        method: 'POST',
        accessToken,
        refreshToken,
    });
