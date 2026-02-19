// Client-only module — uses localStorage. Must never be imported in Server Components.
'use client'

type ApiSuccess<T> = { success: true; data: T };
type ApiSuccessEmpty = { success: true; data?: undefined };
type ApiError = { success: false; error: string };
export type ApiResult<T = unknown> = ApiSuccess<T> | ApiSuccessEmpty | ApiError;

interface ApiFetchOptions extends Omit<RequestInit, 'headers'> {
    accessToken: string;
    refreshToken: string;
}

export async function apiFetch<T = unknown>(
    path: string,
    { accessToken, refreshToken, ...init }: ApiFetchOptions,
): Promise<ApiResult<T>> {
    const baseHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
    };

    const url = `/api${path}`;

    try {
        const res = await fetch(url, { ...init, headers: baseHeaders, credentials: 'include' });

        // Access token expired — attempt refresh
        if (res.status === 401) {
            const refreshRes = await fetch(url, {
                ...init,
                headers: { ...baseHeaders, 'Refresh': `Bearer ${refreshToken}` },
                credentials: 'include',
            });

            if (refreshRes.status === 302) {
                const newAccess = refreshRes.headers.get('Authorization') ?? '';
                const newRefresh = refreshRes.headers.get('Refresh') ?? '';
                localStorage.setItem('Authorization', newAccess);
                localStorage.setItem('Refresh', newRefresh);

                const finalRes = await fetch(url, {
                    ...init,
                    headers: { ...baseHeaders, 'Authorization': `Bearer ${newAccess}` },
                    credentials: 'include',
                });

                if (finalRes.status === 204) return { success: true };
                const data = await finalRes.json() as T;
                return { success: true, data };
            }

            return { success: false, error: '409' };
        }

        if (res.status === 204) return { success: true };

        if (res.ok) {
            const data = await res.json() as T;
            return { success: true, data };
        }

        return { success: false, error: String(res.status) };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'An error occurred' };
    }
}
