'use client';
import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Member, unreadMessageCount } from '@/app/_component/MemberRecoilState';

const getWsBase = () =>
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

export default function MessageNotificationListener() {
    const memberInfo = useRecoilValue(Member);
    const setUnreadCount = useSetRecoilState(unreadMessageCount);

    useEffect(() => {
        if (!memberInfo.id || typeof window === 'undefined') return;
        const accessToken = localStorage.getItem('Authorization') || '';

        const client = new Client({
            webSocketFactory: () => new SockJS(`${getWsBase()}/ws`),
            connectHeaders: { Authorization: `Bearer ${accessToken}` },
            onConnect: () => {
                client.subscribe(`/topic/notification/${memberInfo.id}`, () => {
                    setUnreadCount(prev => prev + 1);
                });
            },
        });

        client.activate();
        return () => { client.deactivate(); };
    }, [memberInfo.id]);

    return null;
}
