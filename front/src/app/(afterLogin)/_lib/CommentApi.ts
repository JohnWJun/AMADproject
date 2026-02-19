'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export const postComment = ({
    content, accessToken, refreshToken, postId, memberId,
}: { content: string; postId: bigint; memberId: bigint } & TokenProps) =>
    apiFetch(`/${postId}/comment/${memberId}`, {
        method: 'POST',
        body: JSON.stringify({ mention: content }),
        accessToken,
        refreshToken,
    });

export const getComments = ({
    accessToken, refreshToken, postId, page,
}: TokenProps & { postId: bigint; page: number }) =>
    apiFetch(`/${postId}/comment?page=${page}&size=5`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const deleteComment = ({
    accessToken, refreshToken, postId, commentId,
}: TokenProps & { postId: bigint; commentId: bigint }) =>
    apiFetch(`/${postId}/comment/${commentId}`, {
        method: 'DELETE',
        accessToken,
        refreshToken,
    });

export const patchComment = ({
    accessToken, refreshToken, postId, commentId, content,
}: { content: string; postId: bigint; commentId: bigint } & TokenProps) =>
    apiFetch(`/${postId}/comment/${commentId}`, {
        method: 'PATCH',
        body: JSON.stringify({ mention: content }),
        accessToken,
        refreshToken,
    });
