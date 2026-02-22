"use client";

import style from "@/app/(afterLogin)/messages/message.module.css";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';
import { RoomResponse } from '@/app/(afterLogin)/_lib/ChatApi';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = { room: RoomResponse };

export default function Room({ room }: Props) {
    const router = useRouter();

    const onClick = () => {
        router.push(`/messages/${room.roomId}`);
    };

    return (
        <div className={style.room} onClickCapture={onClick}>
            <div className={style.roomUserImage}>
                {room.otherStatusImg ? (
                    <img src={room.otherStatusImg} alt="" />
                ) : (
                    <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#ccc' }} />
                )}
            </div>
            <div className={style.roomChatInfo}>
                <div className={style.roomUserInfo}>
                    <b>{room.otherNickname}</b>
                    &nbsp;
                    <span>@{room.otherEmail}</span>
                    &nbsp;·&nbsp;
                    <span className={style.postDate}>
                        {room.lastMessageAt ? dayjs(room.lastMessageAt).fromNow(true) : ''}
                    </span>
                </div>
                <div className={style.roomLastChat}>
                    {room.lastMessage}
                </div>
            </div>
        </div>
    );
}
