"use client";

import style from "./rightSearchZone.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";

export default function RightSearchZone() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    if (pathname === '/explore') return null;

    if (pathname === '/search') {
        const q = searchParams.get('q') || '';
        const pf = searchParams.get('pf') || '';

        const onChangeAll = () => {
            router.replace(`/search?q=${encodeURIComponent(q)}`);
        };
        const onChangeFollow = () => {
            router.replace(`/search?q=${encodeURIComponent(q)}&pf=on`);
        };

        return (
            <div>
                <h5 className={style.filterTitle}>검색 필터</h5>
                <div className={style.filterSection}>
                    <div>
                        <label>사용자</label>
                        <div className={style.radio}>
                            <div>모든 사용자</div>
                            <input type="radio" name="pf" checked={pf !== 'on'} onChange={onChangeAll} />
                        </div>
                        <div className={style.radio}>
                            <div>내가 팔로우하는 사람들</div>
                            <input type="radio" name="pf" value="on" checked={pf === 'on'} onChange={onChangeFollow} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ marginBottom: 60, width: 'inherit' }}>
            <SearchForm />
        </div>
    );
}