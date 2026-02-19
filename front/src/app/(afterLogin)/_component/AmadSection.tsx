"use client"

import { Member } from '@/app/_component/MemberRecoilState';
import style from './amadAbstractSection.module.css';
import AmadAbstract from "@/app/(afterLogin)/_component/AmadAbstract";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import { useRecoilValue } from 'recoil';
import {getTdyAmad} from '@/app/(afterLogin)/_lib/AmadApi'
import ComponentLoader from '@/app/_component/ComponentLoader';
import {useRouter} from 'next/navigation';



interface MyAmad {
    id: bigint,
    createdAt: string,
    modifiedAt: string,
    complete: boolean,
    mission: string,
}
export default function AmadSection() {
    const pathname = usePathname();
    const memberInfo = useRecoilValue(Member);
    const memberId = memberInfo.id;
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [myAmad, setMyAmad] = useState<MyAmad | null>(null);

    useEffect(() => {
        setAccessToken(localStorage.getItem("Authorization") || '');
        setRefreshToken(localStorage.getItem("Refresh") || '');
    }, []);
    const router = useRouter();

    useEffect(() => {
        if (memberId && accessToken) {
            const fetchPost = async () => {

                const { success, data, error } = await getTdyAmad({ accessToken, refreshToken, memberId});

                if (success) {
                    setMyAmad(data)
                } else {
                    setMyAmad(null);
                }
                if(!success && error === '409'){
                    console.log("login failed");
                    router.replace('/')
                }

            };

            fetchPost();
        }
    }, [memberId, accessToken, refreshToken, pathname]);

    if(pathname === '/explore') return null;
    return (
        <div className={style.amadBg}>
            <div className={style.amad}>
                <h3>나의 AMAD</h3>
                {myAmad ? (<AmadAbstract myAmad={myAmad}/>) :
          (<ComponentLoader header='아직 아마드가 없습니다.' body='오늘의 묵상을 완료하세요!' />)}

            </div>
        </div>
    )
}