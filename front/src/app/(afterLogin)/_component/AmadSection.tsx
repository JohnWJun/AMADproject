"use client"

import style from './amadAbstractSection.module.css';
import AmadAbstract from "@/app/(afterLogin)/_component/AmadAbstract";
import {usePathname} from "next/navigation";


export default function AmadSection() {
    const pathname = usePathname();
    if(pathname === '/explore') return null;

    return (
        <div className={style.amadBg}>
            <div className={style.amad}>
                <h3>나의 AMAD</h3>
                <AmadAbstract />

            </div>
        </div>
    )
}