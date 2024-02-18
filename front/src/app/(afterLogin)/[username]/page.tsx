"use client";
import style from './profile.module.css';
import Post from "@/app/(afterLogin)/_component/PostAbstract";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useRecoilState, useRecoilValue} from "recoil"
import {Member} from "@/app/_component/MemberRecoilState";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";



export default function Profile() {

    const member = useRecoilValue(Member);
//남의 프로필일경우와 내 프로필일 경우 분리
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
            <div className={style.statusContainer}>
                <h4>하나님과의 친밀도</h4>


                <div className={style.progressContainer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#e3e3e3" width="30px" height="30px"
                         viewBox="0 0 24 24">
                        <path
                            d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"/>
                    </svg>
                    <progress value={member.intimacy} max="200"/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#f95959" width="30px" height="30px"
                         viewBox="0 0 24 24">
                        <path
                            d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"/>
                    </svg>
                </div>


            </div>
        </main>
    )
}