'use client'
import { apiFetch } from './apiClient';

const tdy = new Date();
const year = tdy.getFullYear();
const month = tdy.getMonth() + 1 < 10 ? '0' + (tdy.getMonth() + 1) : tdy.getMonth() + 1;
const day = tdy.getDate() < 10 ? '0' + tdy.getDate() : tdy.getDate();
const localDateForm = `${year}-${month}-${day}`;

type TokenProps = { accessToken: string; refreshToken: string };

export const patchAmadAccomplished = ({
    requestBody, accessToken, refreshToken, myAmadId,
}: { requestBody: { mission: string; complete: boolean }; myAmadId: bigint } & TokenProps) =>
    apiFetch(`/amad/${myAmadId}`, {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        accessToken,
        refreshToken,
    });

export const getTdyAmad = ({
    accessToken, refreshToken, memberId,
}: TokenProps & { memberId: bigint }) =>
    apiFetch(`/amad/today/${localDateForm}/${memberId}`, {
        method: 'GET',
        accessToken,
        refreshToken,
    });

export const deleteAmad = ({
    accessToken, refreshToken, amadId,
}: TokenProps & { amadId: bigint }) =>
    apiFetch(`/post/${amadId}`, {
        method: 'DELETE',
        accessToken,
        refreshToken,
    });
