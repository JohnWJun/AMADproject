"use client"

import { useEffect, useState } from 'react';
import style from './followRecommend.module.css';
import {getRecommendedFriend} from '../_lib/MemberApi';
import {followMember} from '../_lib/FollowApi';
import {useRouter} from 'next/navigation';
import {useRecoilValue} from 'recoil';
import {Member} from '@/app/_component/MemberRecoilState';

interface Members {
    id: bigint,
    nickname: string,
    statusImg: string,
    email: string,
    intimacy: number,
    roles: []
}

export default function FollowRecommend() {
    const [storedAccessToken, setStoredAccessToken] = useState('');
    const [storedRefreshToken, setStoredRefreshToken] = useState('');
    const [recommendedMembers, setMembers] = useState<Members[]>([]);
    const [loadingIds, setLoadingIds] = useState<Set<number>>(new Set());
    const router = useRouter();
    const loginUser = useRecoilValue(Member);

    useEffect(() => {
        setStoredAccessToken(localStorage.getItem("Authorization") || '');
        setStoredRefreshToken(localStorage.getItem("Refresh") || '');
    }, []);

    useEffect(() => {
        if (!storedAccessToken) return;
        const fetchUserData = async () => {
            const { success, data, error } = await getRecommendedFriend({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
            });
            if (success) {
                setMembers(data);
            }
            if (!success && error === '409') {
                console.log("login failed");
                router.replace('/');
            }
        };
        fetchUserData();
    }, [storedAccessToken]);

    const onClickFollow = async (memberId: number) => {
        if (loadingIds.has(memberId)) return;
        setLoadingIds(prev => new Set(prev).add(memberId));
        {
            const { success, error } = await followMember({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                followingId: memberId,
                followerId: Number(loginUser.id),
            });
            if (success || error === '409') {
                setMembers(prev => prev.filter(m => Number(m.id) !== memberId));
            }
        }
        setLoadingIds(prev => {
            const next = new Set(prev);
            next.delete(memberId);
            return next;
        });
    };

    return (
        <div className={style.container}>
            {recommendedMembers.map((recommendedMember, index) => {
                const memberId = Number(recommendedMember.id);
                return (
                    <div className={style.itemSection} key={index}>
                        <div className={style.userLogoSection}>
                            <div className={style.userLogo}>
                                <img src={recommendedMember.statusImg} alt={recommendedMember.email} />
                            </div>
                        </div>
                        <div className={style.userInfo}>
                            <div className={style.title}>{recommendedMember.nickname}</div>
                            <div className={style.count}>@{recommendedMember.email.replace('@gmail.com', '')}</div>
                        </div>
                        <div className={style.followButtonSection}>
                            <button
                                onClick={() => onClickFollow(memberId)}
                                disabled={loadingIds.has(memberId)}
                            >
                                팔로우
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
