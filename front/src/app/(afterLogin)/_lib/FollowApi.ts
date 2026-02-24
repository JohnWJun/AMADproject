'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export const followMember = ({
    accessToken, refreshToken, followingId, followerId,
}: TokenProps & { followingId: number; followerId: number }) =>
    apiFetch(`/members/${followingId}/follow/${followerId}`, {
        method: 'POST',
        accessToken,
        refreshToken,
    });

export const unfollowMember = ({
    accessToken, refreshToken, followingId, followerId,
}: TokenProps & { followingId: number; followerId: number }) =>
    apiFetch(`/members/${followingId}/follow/${followerId}`, {
        method: 'DELETE',
        accessToken,
        refreshToken,
    });

export const getFollowStatus = ({
    accessToken, refreshToken, followingId, followerId,
}: TokenProps & { followingId: number; followerId: number }) =>
    apiFetch(`/members/${followingId}/follow/${followerId}/status`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });
