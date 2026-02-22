'use client';
import style from './chatRoom.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import cx from 'classnames';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getMessages, getRoom, MessageResponse, RoomResponse } from '@/app/(afterLogin)/_lib/ChatApi';
import { useRecoilValue } from 'recoil';
import { Member } from '@/app/_component/MemberRecoilState';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const SERVER_URL = process.env.NEXT_PUBLIC_API_PROXY_TARGET || 'http://localhost:8080';

type Props = { params: { room: string } };

export default function ChatRoom({ params }: Props) {
    const roomId = Number(params.room);
    const memberInfo = useRecoilValue(Member);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [roomInfo, setRoomInfo] = useState<RoomResponse | null>(null);
    const [content, setContent] = useState('');
    const clientRef = useRef<Client | null>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === 'undefined' || !memberInfo.id) return;
        const accessToken = localStorage.getItem('Authorization') || '';
        const refreshToken = localStorage.getItem('Refresh') || '';

        getMessages({ accessToken, refreshToken, roomId, page: 1 }).then(({ success, data }) => {
            if (success && data) setMessages(data);
        });

        getRoom({ accessToken, refreshToken, roomId }).then(({ success, data }) => {
            if (success && data) setRoomInfo(data);
        });

        const client = new Client({
            webSocketFactory: () => new SockJS(`${SERVER_URL}/ws`),
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

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
            <div className={style.list}>
                {messages.map((m) => {
                    const isMe = m.senderEmail === memberInfo.email;
                    return (
                        <div
                            key={m.messageId}
                            className={cx(style.message, isMe ? style.myMessage : style.yourMessage)}
                        >
                            <div className={style.content}>{m.content}</div>
                            <div className={style.date}>{dayjs(m.createdAt).format('YYYY년 MM월 DD일 A HH시 mm분')}</div>
                        </div>
                    );
                })}
                <div ref={bottomRef} />
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
