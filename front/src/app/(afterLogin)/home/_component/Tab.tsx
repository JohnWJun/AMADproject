"use client";
import style from './tab.module.css';
import {useState} from "react";

type Props ={
    fetchPosts: () => void
    fetchTdyPosts: () => void
}

export default function Tab({ fetchPosts, fetchTdyPosts}: Props) {
    const [tab, setTab] = useState('tdy');

    const onClickTdy = () => {
        setTab('tdy');
        fetchTdyPosts();
    }
    const onClickAll = () => {
        setTab('all');
        fetchPosts();
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