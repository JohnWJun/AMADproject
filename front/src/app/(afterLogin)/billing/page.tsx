'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './billing.module.css';
import {
    getSubscriptionStatus,
    createPortalSession,
    SubscriptionStatus,
} from '@/app/(afterLogin)/_lib/BillingApi';

const STATUS_LABEL: Record<string, string> = {
    active: '활성',
    trialing: '체험 중',
    past_due: '결제 실패',
    unpaid: '미결제',
    canceled: '취소됨',
    none: '구독 없음',
};

export default function BillingPage() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [sub, setSub] = useState<SubscriptionStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [portalLoading, setPortalLoading] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const at = localStorage.getItem('Authorization') || '';
        const rt = localStorage.getItem('Refresh') || '';
        setAccessToken(at);
        setRefreshToken(rt);

        (async () => {
            const { success, data } = await getSubscriptionStatus({ accessToken: at, refreshToken: rt });
            if (success && data) setSub(data);
            setLoading(false);
        })();
    }, []);

    const handlePortal = async () => {
        setPortalLoading(true);
        const { success, data } = await createPortalSession({ accessToken, refreshToken });
        if (success && data?.url) {
            window.location.href = data.url;
        } else {
            alert('포털을 열 수 없습니다. 잠시 후 다시 시도해주세요.');
            setPortalLoading(false);
        }
    };

    const formatDate = (iso: string | null) => {
        if (!iso) return '-';
        return new Date(iso).toLocaleDateString('ko-KR', {
            year: 'numeric', month: 'long', day: 'numeric',
        });
    };

    if (loading) {
        return (
            <main className={style.main}>
                <div className={style.loadingText}>불러오는 중...</div>
            </main>
        );
    }

    const hasActive = sub?.hasPremiumAccess;
    const statusText = sub ? (STATUS_LABEL[sub.status] ?? sub.status) : '구독 없음';

    return (
        <main className={style.main}>
            <div className={style.header}>
                <button className={style.backBtn} onClick={() => router.back()}>
                    ← 뒤로
                </button>
                <h1 className={style.title}>구독 관리</h1>
            </div>

            <div className={style.card}>
                <div className={style.row}>
                    <span className={style.label}>플랜</span>
                    <span className={style.value}>
                        {sub?.planKey ? '월간 프리미엄' : '무료'}
                    </span>
                </div>
                <div className={style.row}>
                    <span className={style.label}>상태</span>
                    <span className={`${style.value} ${hasActive ? style.active : style.inactive}`}>
                        {statusText}
                    </span>
                </div>
                {sub?.currentPeriodEnd && (
                    <div className={style.row}>
                        <span className={style.label}>
                            {sub.cancelAtPeriodEnd ? '종료일' : '갱신일'}
                        </span>
                        <span className={style.value}>{formatDate(sub.currentPeriodEnd)}</span>
                    </div>
                )}
                {sub?.cancelAtPeriodEnd && (
                    <div className={style.cancelNote}>
                        구독이 취소 예정입니다. 갱신일까지 프리미엄 기능을 계속 이용하실 수 있습니다.
                    </div>
                )}
            </div>

            <div className={style.actions}>
                {hasActive ? (
                    <button
                        className={style.portalBtn}
                        onClick={handlePortal}
                        disabled={portalLoading}
                    >
                        {portalLoading ? '이동 중...' : '결제 수단 / 취소 관리'}
                    </button>
                ) : (
                    <button
                        className={style.upgradeBtn}
                        onClick={() => router.push('/pricing')}
                    >
                        프리미엄 구독하기
                    </button>
                )}
            </div>
        </main>
    );
}
