'use client';
import style from './message.module.css';
import Room from "@/app/(afterLogin)/messages/_component/Room";
import { useEffect, useState } from 'react';
import { getRooms, RoomResponse } from '@/app/(afterLogin)/_lib/ChatApi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { Member, unreadMessageCount } from '@/app/_component/MemberRecoilState';
import { getCurrentUserInfo } from '@/app/(afterLogin)/_lib/MemberApi';
import { useRouter } from 'next/navigation';

export default function MessagesPage() {
    const [memberInfo, setMemberInfo] = useRecoilState(Member);
    const [rooms, setRooms] = useState<RoomResponse[]>([]);
    const setUnreadCount = useSetRecoilState(unreadMessageCount);
    const router = useRouter();

    // Clear the badge whenever the user opens this page
    useEffect(() => { setUnreadCount(0); }, []);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const accessToken = localStorage.getItem('Authorization') || '';
        const refreshToken = localStorage.getItem('Refresh') || '';

        const fetchRooms = async (memberId: number) => {
            const { success, data } = await getRooms({ accessToken, refreshToken, memberId });
            if (success && data) setRooms(data);
        };

        if (memberInfo.id) {
            fetchRooms(memberInfo.id);
        } else {
            // Recoil not yet hydrated — fetch member info from server first
            getCurrentUserInfo({ accessToken, refreshToken, setMemberInfo }).then((res) => {
                if (!res.success) {
                    if (res.error === '409') router.replace('/');
                    return;
                }
                if (res.data?.id) fetchRooms(res.data.id);
            });
        }
    }, []);

    return (
        <main className={style.main}>
            <div className={style.header}>
                <h3>쪽지</h3>
            </div>
            {rooms.map((room) => (
                <Room key={room.roomId} room={room} />
            ))}
        </main>
    );
}
