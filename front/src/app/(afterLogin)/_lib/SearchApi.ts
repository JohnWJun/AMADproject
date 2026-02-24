'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export const getPostBySearch = ({
    accessToken, refreshToken, keyword, page, f, pf,
}: TokenProps & { keyword: string; page: number; f?: string; pf?: string }) => {
    const fParam = f ? `&f=${encodeURIComponent(f)}` : '';
    const pfParam = pf ? `&pf=${encodeURIComponent(pf)}` : '';
    return apiFetch(`/search?keyword=${encodeURIComponent(keyword)}&page=${page}&size=10${fParam}${pfParam}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });
};
