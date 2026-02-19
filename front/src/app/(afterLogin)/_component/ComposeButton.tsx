"use client";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Member } from "@/app/_component/MemberRecoilState";
import Link from "next/link";
import PostButton from "./PostButton";
import { getPostTdyDetail } from "../_lib/PostApi";
import { usePathname } from "next/navigation";

type Props = {
    className: string;
}

export default function ComposeButton({ className }: Props) {
    const pathname = usePathname();
    const memberInfo = useRecoilValue(Member);
    const memberId = memberInfo.id;
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [hasTodayPost, setHasTodayPost] = useState(false);

    useEffect(() => {
        setAccessToken(localStorage.getItem("Authorization") || '');
        setRefreshToken(localStorage.getItem("Refresh") || '');
    }, []);

    useEffect(() => {
        if (!memberId || !accessToken) return;
        const checkTodayPost = async () => {
            const { success } = await getPostTdyDetail({ accessToken, refreshToken, memberId });
            setHasTodayPost(success);
        };
        checkTodayPost();
    }, [memberId, accessToken, pathname]);

    if (hasTodayPost) {
        return (
            <div className={className} style={{ opacity: 0.4, cursor: 'not-allowed', pointerEvents: 'none' }}>
                <span>묵상하기</span>
                <PostButton />
            </div>
        );
    }

    return (
        <Link href="/compose/amad" className={className}>
            <span>묵상하기</span>
            <PostButton />
        </Link>
    );
}
