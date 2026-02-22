'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export const getPostBySearch = ({
    accessToken, refreshToken, keyword, page, f,
}: TokenProps & { keyword: string; page: number; f?: string }) => {
    const fParam = f ? `&f=${encodeURIComponent(f)}` : '';
    return apiFetch(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=10${fParam}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });
};
