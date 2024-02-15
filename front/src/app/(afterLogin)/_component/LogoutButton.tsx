"use client"

import style from "./logoutButton.module.css";
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState";

export default function LogoutButton() {
    const member = useRecoilValue(Member);

    const onLogout = () => {};

    return (
        <button className={style.logOutButton} onClick={onLogout}>
            <div className={style.logOutUserImage}>
                <img src={member.statusImg} alt={member.email}/>
            </div>
            <div className={style.logOutUserName}>
                <div>{member.nickname}</div>
                <div>@{member.email}</div>
            </div>
        </button>
    )
}