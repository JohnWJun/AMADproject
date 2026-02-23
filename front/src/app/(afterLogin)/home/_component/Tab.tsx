"use client";
import style from './tab.module.css';
import {useState} from "react";
import {useRouter} from "next/navigation";

type Props ={
    setPage: any
    setIsTdy: any
    setPosts: any,
    setIsLastPost: any
    onTabChange: () => void
}

export default function Tab({ setIsLastPost,setPage, setIsTdy, setPosts, onTabChange}: Props) {
    const [tab, setTab] = useState('tdy');

    const router = useRouter();
    const onClickTdy = () => {
        onTabChange();
        setTab('tdy');
        setPage(1);
        setIsTdy(true);
        setPosts([]);
        setIsLastPost(false);
        router.replace('/home');
        router.refresh();

    }
    const onClickAll = () => {
        onTabChange();
        setTab('all');
        setPage(1);
        setIsTdy(false);
        setPosts([]);
        setIsLastPost(false);
        router.replace('/home');
        router.refresh();

    }
    let today = new Date();
    let day = ['일', '월', '화', '수', '목', '금', '토'];

    let dateFormat = today.getFullYear() + '년 ' + (today.getMonth()+1) + '월 '
        + today.getDate() + '일 ' + day[today.getDay()] + '요일 ';

    return (
        <div className={style.homeFixed}>
            <div className={style.homeText}>{dateFormat} / 친구들의 AMAD</div>
            <div className={style.homeTab}>
                <div onClick={onClickTdy}>
                    오늘
                    <div className={style.tabIndicator} hidden={tab === 'all'} ></div>
                </div>
                <div onClick={onClickAll}>
                    모든
                    <div className={style.tabIndicator} hidden={tab === 'tdy'} ></div>
                </div>
            </div>
        </div>
    )
}
