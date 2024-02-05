"use client";
import style from './tab.module.css';
import {useState} from "react";

export default function Tab() {
    const [tab, setTab] = useState('rec');

    const onClickRec = () => {
        setTab('rec');
    }
    const onClickFol = () => {
        setTab('fol');
    }
    let today = new Date();
    let day = ['일', '월', '화', '수', '목', '금', '토'];

    let dateFormat = today.getFullYear() + '년 ' + (today.getMonth()+1) + '월 '
        + today.getDate() + '일 ' + day[today.getDay()] + '요일 ';

    return (
        <div className={style.homeFixed}>
            <div className={style.homeText}>{dateFormat} / 친구들의 AMAD</div>
            <div className={style.homeTab}>
                <div onClick={onClickRec}>
                    추천
                    <div className={style.tabIndicator} hidden={tab === 'fol'}></div>
                </div>
                <div onClick={onClickFol}>
                    팔로우 중
                    <div className={style.tabIndicator} hidden={tab === 'rec'}></div>
                </div>
            </div>
        </div>
    )
}