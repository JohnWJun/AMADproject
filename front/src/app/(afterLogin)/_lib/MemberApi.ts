'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export const getCurrentUserInfo = async ({
    accessToken, refreshToken, setMemberInfo,
}: TokenProps & { setMemberInfo: (data: any) => void }) => {
    const result = await apiFetch('/members/me', { method: 'GET', accessToken, refreshToken });
    if (result.success && result.data) setMemberInfo(result.data);
    return result;
};

export const getUserInfo = ({
    accessToken, refreshToken, emailToFind,
}: TokenProps & { emailToFind: string }) =>
    apiFetch(`/members/${emailToFind}`, { method: 'GET', accessToken, refreshToken });

export const patchNickname = async ({
    accessToken, refreshToken, nickname, userId, setMemberInfo,
}: TokenProps & { nickname: string; userId: bigint; setMemberInfo: (data: any) => void }) => {
    const result = await apiFetch(`/members/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ nickname }),
        accessToken,
        refreshToken,
    });
    if (result.success && result.data) setMemberInfo(result.data);
    return result;
};

export const getRecommendedFriend = ({ accessToken, refreshToken }: TokenProps) =>
    apiFetch('/members/recommend?page=1&size=3', { method: 'GET', accessToken, refreshToken });

export const getMembers = ({
    accessToken, refreshToken, page,
}: TokenProps & { page: number }) =>
    apiFetch(`/members?page=${page}&size=10`, { method: 'GET', accessToken, refreshToken });

export const getFollowings = ({
    accessToken, refreshToken, memberId,
}: TokenProps & { memberId: number }) =>
    apiFetch(`/members/${memberId}/following`, { method: 'GET', accessToken, refreshToken });

export const deleteMember = ({
    storedAccessToken, storedRefreshToken, memberId,
}: { storedAccessToken: string; storedRefreshToken: string; memberId: bigint }) =>
    apiFetch(`/members/${memberId}`, {
        method: 'DELETE',
        accessToken: storedAccessToken,
        refreshToken: storedRefreshToken,
    });
