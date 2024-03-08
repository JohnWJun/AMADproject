"use client"

import { Member } from '@/app/_component/MemberRecoilState';
import style from './amadAbstractSection.module.css';
import AmadAbstract from "@/app/(afterLogin)/_component/AmadAbstract";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import { useRecoilValue } from 'recoil';
import {getTdyAmad} from '@/app/(afterLogin)/_lib/AmadApi'
import ComponentLoader from '@/app/_component/ComponentLoader';



interface MyAmad {
    id: bigint,
    createdAt: string,
    modifiedAt: string,
    complete: boolean,
    mission: string,
}
export default function AmadSection() {
    const pathname = usePathname();
    if(pathname === '/explore') return null;
    const memberInfo = useRecoilValue(Member);
    const memberId = memberInfo.id;
    const accessToken = localStorage.getItem("Authorization") ||'';
    const refreshToken = localStorage.getItem("Refresh") ||'';
    const [myAmad, setMyAmad] = useState<MyAmad | null>(null);

    useEffect(() => {
        if (memberId) {
            const fetchPost = async () => {

                const { success, data } = await getTdyAmad({ accessToken, refreshToken, memberId});

                if (success) {
                    setMyAmad(data)
                }
            };

            fetchPost();
        }
    }, [memberId]);


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