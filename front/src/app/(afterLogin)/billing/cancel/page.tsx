'use client';
import { useRouter } from 'next/navigation';
import style from './cancel.module.css';

export default function BillingCancelPage() {
    const router = useRouter();

    return (
        <main className={style.main}>
            <div className={style.icon}>↩</div>
            <h1 className={style.title}>결제가 취소되었습니다</h1>
            <p className={style.desc}>
                결제 진행이 취소되었습니다. 언제든지 다시 구독을 시작할 수 있습니다.
            </p>
            <div className={style.actions}>
                <button className={style.retryBtn} onClick={() => router.push('/pricing')}>
                    다시 구독하기
                </button>
                <button className={style.homeBtn} onClick={() => router.push('/home')}>
                    홈으로 돌아가기
                </button>
            </div>
        </main>
    );
}
