"use client"

import { useEffect, useState } from 'react';
import style from './followRecommend.module.css';
import {getRecommendedFriend} from '../_lib/MemberApi'


interface Members {

    id:bigint,
    nickname:string,
    statusImg:string,
    email:string,
    intimacy:number,
    roles:[]
}

export default function FollowRecommend() {
    const onFollow = () => {
        alert('아직 구현되지 않았습니다. Comming Soon!');
    };
    const storedAccessToken = localStorage.getItem("Authorization") || '';
    const storedRefreshToken = localStorage.getItem("Refresh") || '';
    const [recommendedMembers, setMembers] = useState<Members[] >([]);


    
    useEffect(() => {
        const fetchUserData = async () => {
        
            
                const { success, data } = await getRecommendedFriend({
                    accessToken: storedAccessToken,
                    refreshToken: storedRefreshToken,
                });
                if(success){
                    setMembers(data);
                }
            
        };

            fetchUserData();

    }, []);


    return (

    
            <div className={style.container}>
                {recommendedMembers.map((recommendedMember, index) => (
                    <div className={style.itemSection} key={index}>
                        <div className={style.userLogoSection}>
                            <div className={style.userLogo}>
                                <img src={recommendedMember.statusImg} alt={recommendedMember.email} />
                            </div>
                        </div>
                        <div className={style.userInfo}>
                            <div className={style.title}>{recommendedMember.nickname}</div>
                            <div className={style.count}>@{recommendedMember.email.replace('@gmail.com','')}</div>
                        </div>
                        <div className={style.followButtonSection}>
                            <button onClick={() => onFollow()}>팔로우</button>
                        </div>
                    </div>
                ))}
            </div>

        
        
    )
}