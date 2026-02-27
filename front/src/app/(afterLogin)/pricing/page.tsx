'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import style from './pricing.module.css';
import { createCheckoutSession, getSubscriptionStatus } from '@/app/(afterLogin)/_lib/BillingApi';

export default function PricingPage() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [hasPremium, setHasPremium] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const at = localStorage.getItem('Authorization') || '';
        const rt = localStorage.getItem('Refresh') || '';
        setAccessToken(at);
        setRefreshToken(rt);

        (async () => {
            const { success, data } = await getSubscriptionStatus({ accessToken: at, refreshToken: rt });
            if (success && data?.hasPremiumAccess) setHasPremium(true);
            setChecking(false);
        })();
    }, []);

    const handleSubscribe = async () => {
        if (!accessToken) { router.push('/i/flow/login'); return; }
        setLoading(true);
        const { success, data } = await createCheckoutSession({
            planKey: 'monthly',
            accessToken,
            refreshToken,
        });
        if (success && data?.url) {
            window.location.href = data.url;
        } else {
            alert('결제 페이지로 이동할 수 없습니다. 잠시 후 다시 시도해주세요.');
            setLoading(false);
        }
    };

    return (
        <main className={style.main}>
            <div className={style.header}>
                <h1 className={style.title}>프리미엄 구독</h1>
                <p className={style.subtitle}>더 깊은 묵상 여정을 시작하세요</p>
            </div>

            <div className={style.cardWrapper}>
                {/* Free plan */}
                <div className={style.card}>
                    <div className={style.planLabel}>무료</div>
                    <div className={style.price}>
                        <span className={style.amount}>₩0</span>
                        <span className={style.period}> / 월</span>
                    </div>
                    <ul className={style.features}>
                        <li className={style.feature}>
                            <span className={style.checkIcon}>✓</span> 매일 말씀 묵상 작성
                        </li>
                        <li className={style.feature}>
                            <span className={style.checkIcon}>✓</span> 커뮤니티 피드 열람
                        </li>
                        <li className={style.feature}>
                            <span className={style.checkIcon}>✓</span> AI PathFinder 20,000 토큰/일
                        </li>
                        <li className={`${style.feature} ${style.disabled}`}>
                            <span className={style.xIcon}>✗</span> 그룹 기능
                        </li>
                    </ul>
                    <div className={style.currentPlanBadge}>현재 플랜</div>
                </div>

                {/* Premium plan */}
                <div className={`${style.card} ${style.premiumCard}`}>
                    <div className={`${style.planLabel} ${style.premiumLabel}`}>프리미엄</div>
                    <div className={style.price}>
                        <span className={style.amount}>₩9,900</span>
                        <span className={style.period}> / 월</span>
                    </div>
                    <ul className={style.features}>
                        <li className={style.feature}>
                            <span className={style.checkIcon}>✓</span> 무료 플랜의 모든 기능
                        </li>
                        <li className={style.feature}>
                            <span className={style.checkIcon}>✓</span> 그룹 생성 및 관리
                        </li>
                        <li className={style.feature}>
                            <span className={style.checkIcon}>✓</span> 그룹 전용 묵상 피드
                        </li>
                        <li className={style.feature}>
                            <span className={style.checkIcon}>✓</span> 우선 고객 지원
                        </li>
                    </ul>

                    {checking ? (
                        <div className={style.loadingBtn}>확인 중...</div>
                    ) : hasPremium ? (
                        <button
                            className={style.manageBtn}
                            onClick={() => router.push('/billing')}
                        >
                            구독 관리
                        </button>
                    ) : (
                        <button
                            className={style.subscribeBtn}
                            onClick={handleSubscribe}
                            disabled={loading}
                        >
                            {loading ? '이동 중...' : '구독 시작하기'}
                        </button>
                    )}
                </div>
            </div>

            <p className={style.disclaimer}>
                구독은 언제든지 취소할 수 있습니다. 취소 후에도 결제 기간 종료일까지 프리미엄 기능을 이용하실 수 있습니다.
            </p>
        </main>
    );
}
