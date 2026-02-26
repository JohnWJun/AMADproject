'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export const createGroup = ({
    name, description, accessToken, refreshToken,
}: { name: string; description: string } & TokenProps) =>
    apiFetch('/groups', {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        accessToken,
        refreshToken,
    });

export const getMyGroups = ({ accessToken, refreshToken }: TokenProps) =>
    apiFetch('/groups/mine', {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getGroupDetail = ({
    groupId, accessToken, refreshToken,
}: { groupId: number | string } & TokenProps) =>
    apiFetch(`/groups/${groupId}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const updateGroup = ({
    groupId, name, description, accessToken, refreshToken,
}: { groupId: number | string; name?: string; description?: string } & TokenProps) =>
    apiFetch(`/groups/${groupId}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, description }),
        accessToken,
        refreshToken,
    });

export const deleteGroup = ({
    groupId, accessToken, refreshToken,
}: { groupId: number | string } & TokenProps) =>
    apiFetch(`/groups/${groupId}`, {
        method: 'DELETE',
        accessToken,
        refreshToken,
    });

export const getGroupMembers = ({
    groupId, accessToken, refreshToken,
}: { groupId: number | string } & TokenProps) =>
    apiFetch(`/groups/${groupId}/members`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getPendingRequests = ({
    groupId, accessToken, refreshToken,
}: { groupId: number | string } & TokenProps) =>
    apiFetch(`/groups/${groupId}/requests`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const requestJoin = ({
    groupId, accessToken, refreshToken,
}: { groupId: number | string } & TokenProps) =>
    apiFetch(`/groups/${groupId}/join`, {
        method: 'POST',
        accessToken,
        refreshToken,
    });

export const inviteMember = ({
    groupId, targetEmail, accessToken, refreshToken,
}: { groupId: number | string; targetEmail: string } & TokenProps) =>
    apiFetch(`/groups/${groupId}/invite?targetEmail=${encodeURIComponent(targetEmail)}`, {
        method: 'POST',
        accessToken,
        refreshToken,
    });

export const approveRequest = ({
    groupId, memberId, accessToken, refreshToken,
}: { groupId: number | string; memberId: number | string } & TokenProps) =>
    apiFetch(`/groups/${groupId}/approve/${memberId}`, {
        method: 'POST',
        accessToken,
        refreshToken,
    });

export const removeMember = ({
    groupId, memberId, accessToken, refreshToken,
}: { groupId: number | string; memberId: number | string } & TokenProps) =>
    apiFetch(`/groups/${groupId}/members/${memberId}`, {
        method: 'DELETE',
        accessToken,
        refreshToken,
    });

export const getGroupFeed = ({
    page, size = 3, accessToken, refreshToken,
}: { page: number; size?: number } & TokenProps) =>
    apiFetch(`/groups/feed?page=${page}&size=${size}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getGroupPosts = ({
    groupId, page, size = 3, accessToken, refreshToken,
}: { groupId: number | string; page: number; size?: number } & TokenProps) =>
    apiFetch(`/groups/${groupId}/posts?page=${page}&size=${size}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });
