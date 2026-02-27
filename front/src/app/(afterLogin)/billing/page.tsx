'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import style from './billing.module.css';
import {
    getSubscriptionStatus,
    cancelSubscription,
    SubscriptionStatus,
} from '@/app/(afterLogin)/_lib/BillingApi';
import { subscriptionStatus } from '@/app/_component/MemberRecoilState';

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
    const [canceling, setCanceling] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [, setSubStatus] = useRecoilState(subscriptionStatus);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const at = localStorage.getItem('Authorization') || '';
        const rt = localStorage.getItem('Refresh') || '';
        setAccessToken(at);
        setRefreshToken(rt);

        (async () => {
            const { success, data } = await getSubscriptionStatus({ accessToken: at, refreshToken: rt });
            if (success && data) {
                setSub(data);
                // Redirect to pricing if no active subscription
                if (!data.hasPremiumAccess && data.status === 'none') {
                    router.replace('/pricing');
                }
            }
            setLoading(false);
        })();
    }, []);

    const handleCancel = async () => {
        setCanceling(true);
        setShowConfirm(false);
        const { success } = await cancelSubscription({ accessToken, refreshToken });
        if (success) {
            // Refresh local state
            const { data } = await getSubscriptionStatus({ accessToken, refreshToken });
            if (data) {
                setSub(data);
                if (!data.hasPremiumAccess) setSubStatus('free');
            }
        } else {
            alert('구독 해지에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
        setCanceling(false);
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
    const isCancelingAtEnd = sub?.cancelAtPeriodEnd;
    const statusText = sub ? (STATUS_LABEL[sub.status] ?? sub.status) : '구독 없음';

    return (
        <main className={style.main}>
            <div className={style.header}>
                <button className={style.backBtn} onClick={() => router.back()}>← 뒤로</button>
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
                        {isCancelingAtEnd ? '해지 예정' : statusText}
                    </span>
                </div>
                {sub?.currentPeriodEnd && (
                    <div className={style.row}>
                        <span className={style.label}>
                            {isCancelingAtEnd ? '프리미엄 종료일' : '다음 갱신일'}
                        </span>
                        <span className={style.value}>{formatDate(sub.currentPeriodEnd)}</span>
                    </div>
                )}
                {isCancelingAtEnd && (
                    <div className={style.cancelNote}>
                        구독이 해지 예정입니다. 종료일까지 프리미엄 기능을 계속 이용하실 수 있습니다.
                    </div>
                )}
            </div>

            <div className={style.actions}>
                {hasActive && !isCancelingAtEnd && (
                    <button
                        className={style.cancelBtn}
                        onClick={() => setShowConfirm(true)}
                        disabled={canceling}
                    >
                        구독 해지
                    </button>
                )}
                {!hasActive && (
                    <button
                        className={style.upgradeBtn}
                        onClick={() => router.push('/pricing')}
                    >
                        프리미엄 구독하기
                    </button>
                )}
            </div>

            {/* Confirmation dialog */}
            {showConfirm && (
                <div className={style.overlay}>
                    <div className={style.dialog}>
                        <h2 className={style.dialogTitle}>구독을 해지하시겠습니까?</h2>
                        <p className={style.dialogDesc}>
                            해지 후에도 <strong>{formatDate(sub?.currentPeriodEnd ?? null)}</strong>까지 프리미엄 기능을 이용하실 수 있습니다.
                        </p>
                        <div className={style.dialogActions}>
                            <button
                                className={style.confirmCancelBtn}
                                onClick={handleCancel}
                                disabled={canceling}
                            >
                                {canceling ? '처리 중...' : '해지 확인'}
                            </button>
                            <button
                                className={style.dismissBtn}
                                onClick={() => setShowConfirm(false)}
                                disabled={canceling}
                            >
                                돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
