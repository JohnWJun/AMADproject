'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import style from './success.module.css';

export default function BillingSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    router.push('/billing');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [router]);

    return (
        <main className={style.main}>
            <div className={style.icon}>🎉</div>
            <h1 className={style.title}>구독이 완료되었습니다!</h1>
            <p className={style.desc}>
                프리미엄 멤버가 되신 것을 환영합니다. 이제 모든 프리미엄 기능을 이용하실 수 있습니다.
            </p>
            {sessionId && (
                <p className={style.sessionId}>결제 확인 ID: {sessionId}</p>
            )}
            <p className={style.redirect}>{countdown}초 후 구독 관리 페이지로 이동합니다...</p>
            <button className={style.btn} onClick={() => router.push('/billing')}>
                지금 이동하기
            </button>
        </main>
    );
}
