import { apiFetch } from '@/app/(afterLogin)/_lib/apiClient';

type Props = {
    accessToken: string;
    refreshToken: string;
    bible: string;
    chapter: string;
    from: string;
    to: string;
};

export const getBible = ({ accessToken, refreshToken, bible, chapter, from, to }: Props) =>
    apiFetch(`/post/api-bible/${bible}/${chapter}/${from}/${to}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });
