'use client'
import { apiFetch } from './apiClient';

const tdy = new Date();
const year = tdy.getFullYear();
const month = tdy.getMonth() + 1 < 10 ? '0' + (tdy.getMonth() + 1) : tdy.getMonth() + 1;
const day = tdy.getDate() < 10 ? '0' + tdy.getDate() : tdy.getDate();
const localDateForm = `${year}-${month}-${day}`;

type BibleVerse = {
    bible: string;
    bibleChapter: number;
    bibleVerseFrom: number;
    bibleVerseTo: number;
};

type PostBody = {
    bibleVerses: BibleVerse[];
    title: string;
    content_1: string;
    content_2: string;
    content_3: string;
    content_4: string;
    content_5: string;
    myAmad: string;
};

type TokenProps = { accessToken: string; refreshToken: string };

export const postPost = ({
    requestBody, accessToken, refreshToken, email,
}: { requestBody: PostBody; email: string } & TokenProps) =>
    apiFetch(`/post/${email}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        accessToken,
        refreshToken,
    });

export const getTodayPosts = ({
    accessToken, refreshToken, page,
}: TokenProps & { page: number }) =>
    apiFetch(`/post/today/${localDateForm}?page=${page}&size=3`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getPostDetail = ({
    accessToken, refreshToken, postId,
}: TokenProps & { postId: bigint }) =>
    apiFetch(`/post/detail/${postId}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const patchPost = ({
    requestBody, accessToken, refreshToken, postId, bibleChapterVerseId, amadId,
}: { requestBody: PostBody; postId: bigint; bibleChapterVerseId: bigint; amadId: bigint } & TokenProps) =>
    apiFetch(`/post/${postId}/${bibleChapterVerseId}/${amadId}`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        accessToken,
        refreshToken,
    });

export const getLastPosts = ({
    accessToken, refreshToken, page, email,
}: TokenProps & { page: number; email: string }) =>
    apiFetch(`/post/last/${email}?page=${page}&size=5`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getPostTdyDetail = ({
    accessToken, refreshToken, memberId,
}: TokenProps & { memberId: bigint }) =>
    apiFetch(`/post/my/${memberId}/${localDateForm}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getPosts = ({
    accessToken, refreshToken, page,
}: TokenProps & { page: number }) =>
    apiFetch(`/post/all?page=${page}&size=3`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const postLike = ({
    accessToken, refreshToken, postId, memberId,
}: TokenProps & { postId: bigint; memberId: bigint }) =>
    apiFetch(`/post/${postId}/${memberId}/like`, {
        method: 'POST',
        accessToken,
        refreshToken,
    });

export const postDislike = ({
    accessToken, refreshToken, postId, memberId,
}: TokenProps & { postId: bigint; memberId: bigint }) =>
    apiFetch(`/post/${postId}/${memberId}/dislike`, {
        method: 'DELETE',
        accessToken,
        refreshToken,
    });

export const deletePost = ({
    accessToken, refreshToken, postId,
}: TokenProps & { postId: bigint }) =>
    apiFetch(`/post/${postId}`, {
        method: 'DELETE',
        accessToken,
        refreshToken,
    });
