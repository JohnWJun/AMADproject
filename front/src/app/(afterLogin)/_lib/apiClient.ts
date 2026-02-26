// Client-only module — uses localStorage. Must never be imported in Server Components.
'use client'

export type ApiResult<T = any> = {
    success: boolean;
    data?: T;
    error?: string;
};

interface ApiFetchOptions extends Omit<RequestInit, 'headers'> {
    accessToken: string;
    refreshToken: string;
}

export async function apiFetch<T = any>(
    path: string,
    { accessToken, refreshToken, ...init }: ApiFetchOptions,
): Promise<ApiResult<T>> {
    const baseHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (accessToken) baseHeaders['Authorization'] = `Bearer ${accessToken}`;

    const url = `/api${path}`;

    try {
        const res = await fetch(url, { ...init, headers: baseHeaders, credentials: 'include' });

        // Access token expired — attempt refresh
        if (res.status === 401) {
            // No tokens at all — user is not logged in
            if (!refreshToken) return { success: false, error: '401' };

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
                const text = await finalRes.text();
                if (!text) return { success: true };
                return { success: true, data: JSON.parse(text) as T };
            }

            return { success: false, error: '409' };
        }

        if (res.status === 204) return { success: true };

        if (res.ok) {
            const text = await res.text();
            if (!text) return { success: true };
            return { success: true, data: JSON.parse(text) as T };
        }

        return { success: false, error: String(res.status) };
    } catch (e) {
        console.error(e);
        return { success: false, error: 'An error occurred' };
    }
}
