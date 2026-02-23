'use client';
import style from './chatRoom.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import cx from 'classnames';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getMessages, getRoom, MessageResponse, RoomResponse } from '@/app/(afterLogin)/_lib/ChatApi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Member, unreadMessageCount } from '@/app/_component/MemberRecoilState';

dayjs.locale('ko');
dayjs.extend(relativeTime);

// Always use the same origin as the page so protocol (http/https) is always correct.
// In prod: nginx routes /ws → backend. In dev: Next.js rewrite routes /ws → backend.
const getWsBase = () =>
    typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

const PAGE_SIZE = 20;

type Props = { params: { room: string } };

export default function ChatRoom({ params }: Props) {
    const roomId = Number(params.room);
    const memberInfo = useRecoilValue(Member);
    const setUnreadCount = useSetRecoilState(unreadMessageCount);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [roomInfo, setRoomInfo] = useState<RoomResponse | null>(null);
    const [content, setContent] = useState('');
    const clientRef = useRef<Client | null>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Pagination state in refs to avoid stale closures in scroll handler
    const pageRef = useRef(1);
    const hasMoreRef = useRef(false);
    const isLoadingMoreRef = useRef(false);
    const tokenRef = useRef({ accessToken: '', refreshToken: '' });

    // Clear the badge when the user opens any chat room
    useEffect(() => { setUnreadCount(0); }, []);

    useEffect(() => {
        if (typeof window === 'undefined' || !memberInfo.id) return;
        const accessToken = localStorage.getItem('Authorization') || '';
        const refreshToken = localStorage.getItem('Refresh') || '';
        tokenRef.current = { accessToken, refreshToken };
        pageRef.current = 1;
        hasMoreRef.current = false;
        isLoadingMoreRef.current = false;

        getMessages({ accessToken, refreshToken, roomId, page: 1 }).then(({ success, data }) => {
            if (success && data) {
                setMessages(data);
                hasMoreRef.current = data.length >= PAGE_SIZE;
            }
        });

        getRoom({ accessToken, refreshToken, roomId }).then(({ success, data }) => {
            if (success && data) setRoomInfo(data);
        });

        const client = new Client({
            webSocketFactory: () => new SockJS(`${getWsBase()}/ws`),
            connectHeaders: { Authorization: `Bearer ${accessToken}` },
            onConnect: () => {
                client.subscribe(`/topic/chat/${roomId}`, (frame) => {
                    const msg: MessageResponse = JSON.parse(frame.body);
                    setMessages((prev) => [...prev, msg]);
                });
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            client.deactivate();
        };
    }, [roomId, memberInfo.id]);

    // Scroll to bottom on new messages — but skip when we're prepending older ones.
    // useLayoutEffect runs synchronously after DOM commit (before paint), so it fires
    // before requestAnimationFrame, letting the load-more handler win when needed.
    useLayoutEffect(() => {
        if (!isLoadingMoreRef.current && listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    // Infinite scroll: load older messages when the user scrolls to the very top
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const handleScroll = () => {
            if (list.scrollTop > 0 || !hasMoreRef.current || isLoadingMoreRef.current) return;

            isLoadingMoreRef.current = true;
            const nextPage = pageRef.current + 1;
            const prevScrollHeight = list.scrollHeight;
            const { accessToken, refreshToken } = tokenRef.current;

            getMessages({ accessToken, refreshToken, roomId, page: nextPage }).then(({ success, data }) => {
                if (success && data && data.length > 0) {
                    setMessages(prev => [...data, ...prev]);
                    pageRef.current = nextPage;
                    hasMoreRef.current = data.length >= PAGE_SIZE;
                    // After React commits the prepended messages, restore scroll position
                    // so the view doesn't jump to the top.
                    requestAnimationFrame(() => {
                        if (listRef.current) {
                            listRef.current.scrollTop = listRef.current.scrollHeight - prevScrollHeight;
                        }
                        isLoadingMoreRef.current = false;
                    });
                } else {
                    hasMoreRef.current = false;
                    isLoadingMoreRef.current = false;
                }
            });
        };

        list.addEventListener('scroll', handleScroll);
        return () => list.removeEventListener('scroll', handleScroll);
    }, [roomId]);

    const sendMessage = () => {
        if (!content.trim() || !clientRef.current?.connected) return;
        clientRef.current.publish({
            destination: `/app/chat/${roomId}`,
            body: JSON.stringify({ content }),
        });
        setContent('');
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            if (e.nativeEvent.isComposing) return; // skip while Korean/IME is still composing
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <main className={style.main}>
            <div className={style.header}>
                <BackButton />
                <div><h2>{roomInfo?.otherNickname ?? '채팅'}</h2></div>
            </div>
            <div className={style.list} ref={listRef}>
                {messages.map((m) => {
                    const isMe = m.senderEmail === memberInfo.email;
                    return (
                        <div
                            key={m.messageId}
                            className={cx(style.message, isMe ? style.myMessage : style.yourMessage)}
                        >
                            <div className={style.content}>{m.content}</div>
                            <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A h시 mm분')}</div>
                        </div>
                    );
                })}
            </div>
            <div className={style.sendForm}>
                <textarea
                    className={style.sendInput}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="메시지를 입력하세요..."
                    rows={2}
                />
                <button className={style.sendButton} onClick={sendMessage}>전송</button>
            </div>
        </main>
    );
}
