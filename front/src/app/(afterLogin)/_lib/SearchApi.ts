'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export const getPostBySearch = ({
    accessToken, refreshToken, keyword, page,
}: TokenProps & { keyword: string; page: number }) =>
    apiFetch(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=3`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });
