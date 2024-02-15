"use client";
import style from './profile.module.css';
import Post from "@/app/(afterLogin)/_component/PostAbstract";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useRecoilState, useRecoilValue} from "recoil"
import {Member} from "@/app/_component/MemberRecoilState";
import {getCurrentUserInfo} from "@/app/(afterLogin)/home/_component/memberapi";


export default function Profile() {

    const member = useRecoilValue(Member);

    return (
        <main className={style.main}>
            <div className={style.header}>
                <BackButton />
                <h3 className={style.headerTitle}>{member.nickname}</h3>
            </div>
            <div className={style.userZone}>
                <div className={style.userImage}>
                    <img src={member.statusImg} alt={''}/>
                </div>
                <div className={style.userName}>
                    <div>{member.nickname}</div>
                    <div>@{member.email}</div>
                </div>
                <button className={style.followButton}>팔로우</button>
            </div>
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </main>
    )
}