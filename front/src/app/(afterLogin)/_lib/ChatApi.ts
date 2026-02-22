'use client'
import { apiFetch } from './apiClient';

type TokenProps = { accessToken: string; refreshToken: string };

export type RoomResponse = {
    roomId: number;
    otherEmail: string;
    otherNickname: string;
    otherStatusImg: string;
    lastMessage: string;
    lastMessageAt: string;
};

export type MessageResponse = {
    messageId: number;
    roomId: number;
    senderEmail: string;
    senderNickname: string;
    content: string;
    createdAt: string;
};

export const createOrGetRoom = ({
    accessToken, refreshToken, member1Id, member2Id,
}: TokenProps & { member1Id: number; member2Id: number }) =>
    apiFetch<{ roomId: number }>(`/chat/rooms?member1Id=${member1Id}&member2Id=${member2Id}`, {
        method: 'POST',
        accessToken,
        refreshToken,
    });

export const getRooms = ({
    accessToken, refreshToken, memberId,
}: TokenProps & { memberId: number }) =>
    apiFetch<RoomResponse[]>(`/chat/rooms/member/${memberId}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getRoom = ({
    accessToken, refreshToken, roomId,
}: TokenProps & { roomId: number }) =>
    apiFetch<RoomResponse>(`/chat/rooms/${roomId}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const getMessages = ({
    accessToken, refreshToken, roomId, page,
}: TokenProps & { roomId: number; page: number }) =>
    apiFetch<MessageResponse[]>(`/chat/rooms/${roomId}/messages?page=${page}&size=20`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });
