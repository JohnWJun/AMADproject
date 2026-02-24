"use client";
import style from './profile.module.css';
import Post from "@/app/(afterLogin)/_component/PostAbstract";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {useRecoilState, useRecoilValue} from "recoil"
import {Member} from "@/app/_component/MemberRecoilState";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import {usePathname, useRouter} from "next/navigation";
import {ChangeEventHandler, useEffect, useState} from "react";
import {getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";
import {getUserInfo, patchNickname, getFollowings} from "@/app/(afterLogin)/_lib/MemberApi";
import {createOrGetRoom} from "@/app/(afterLogin)/_lib/ChatApi";
import {followMember, getFollowStatus, unfollowMember} from "@/app/(afterLogin)/_lib/FollowApi";
import Loader from "@/app/_component/Loader";

type Props = {

    id: bigint,
    nickname: string,
    statusImg: string,
    email: string,
    intimacy: number;

}

export default function Profile() {

    const emailToFind = usePathname().replace('/','') as string;
    const router = useRouter();
    const member = useRecoilValue(Member);
    const [memberInfo, setMemberInfo] = useRecoilState(Member);
    const userId = member.id;
    const accessToken = localStorage.getItem("Authorization") || '';
    const refreshToken = localStorage.getItem("Refresh") || '';
    const loginUserEmail= member.email;
    const [userToFind, setUserToFind] = useState<Props | null>(null);
    const [isEdit, setIsEdit] = useState(false);
    const [nickname, setNickname] = useState("");
    const [isPatched, setIsPatched] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [followingList, setFollowingList] = useState<Props[]>([]);
    const onClickChangeButton = () => {
        setIsEdit(true);
    }
    const onClickSubmitButton = () => {
        //fetch patch member(nickname)
        //refresh
        //the nickname must be updated in recoil when it is patched.
            const fetchUserInfo = async () => {
                const { success, data, error } = await patchNickname({ accessToken, refreshToken, nickname, userId ,setMemberInfo});

                if (success) {
                    setIsEdit(false);
                    setIsPatched(true);
                    router.refresh();
                }
                if(!success && error === '409'){
                    console.log("login failed");
                    router.replace('/')
                }
            }
        fetchUserInfo();

    }
    const onClickCancelButton = () => {
        setIsEdit(false);
    }
    const onChangeNickname: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNickname(e.target.value);
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            const { success, data, error } = await getUserInfo({ accessToken, refreshToken, emailToFind });

            if (success) {
                setUserToFind(data);
                setNickname(data.nickname);
                if (data.email === loginUserEmail) {
                    const followResult = await getFollowings({ accessToken, refreshToken, memberId: Number(data.id) });
                    if (followResult.success) setFollowingList(followResult.data);
                } else if (userId) {
                    const statusResult = await getFollowStatus({
                        accessToken, refreshToken,
                        followingId: Number(data.id),
                        followerId: Number(userId),
                    });
                    if (statusResult.success) {
                        setIsFollowing(statusResult.data.following);
                    }
                }
            }
            if(!success && error === '409'){
                console.log("login failed");
                router.replace('/')
            }
        };
        fetchUserInfo();
    }, [accessToken,refreshToken,emailToFind]);

    const onClickFollow = async () => {
        if (!userToFind || followLoading) return;
        setFollowLoading(true);
        if (isFollowing) {
            const { success } = await unfollowMember({
                accessToken, refreshToken,
                followingId: Number(userToFind.id),
                followerId: Number(userId),
            });
            if (success) setIsFollowing(false);
        } else {
            const { success, error } = await followMember({
                accessToken, refreshToken,
                followingId: Number(userToFind.id),
                followerId: Number(userId),
            });
            if (success || error === '409') setIsFollowing(true);
        }
        setFollowLoading(false);
    };

    const onClickChat = async () => {
        const { success, data } = await createOrGetRoom({
            accessToken, refreshToken,
            member1Id: Number(userId),
            member2Id: Number(userToFind?.id),
        });
        if (success && data) router.push(`/messages/${data.roomId}`);
    };

    if (!userToFind) {
        return (
            <Loader/>
        )
    }

    if (emailToFind === loginUserEmail) {
        return (
            <main className={style.main}>
                <div className={style.header}>
                    <BackButton/>
                    <h3 className={style.headerTitle}>{member.nickname}</h3>
                </div>
            <div className={style.userZone}>
                <div className={style.userImage}>
                    <img src={member.statusImg} alt={''}/>
                </div>
                <div className={style.userName}>
                    <div>
                        {isEdit && (
                            <div className={style.nameContainer}>
                                <div className={style.form__group}>
                                    <input value={nickname} onChange={onChangeNickname} type="input" className={style.form__field} placeholder="Nickname" name="name" id='name'
                                           required/>
                                    <label htmlFor="name" className={style.form__label}>Nickname</label>
                                </div>
                                <button type="button" onClick={onClickSubmitButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                         viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000" />
                                    </svg>
                                </button>
                                <button type="button" onClick={onClickCancelButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="20px" height="20px" viewBox="0 0 512 512" version="1.1">
                                        <g id="Page-1" stroke="none"  fill="none" >
                                            <g id="work-case" fill="#000000"
                                               transform="translate(91.520000, 91.520000)">
                                                <polygon id="Close"
                                                         points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

                                                </polygon>
                                            </g>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        )}

                        {!isEdit && (
                            <div className={style.nameContainer}>
                                {member.nickname}
                                <button type="button" onClick={onClickChangeButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                         viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" className="jam jam-write">
                                        <path
                                            d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/>
                            </svg>
                            </button>
                            </div>)}

                    </div>
                    <div>{member.email}</div>
                </div>
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
            {followingList.length > 0 && (
                <div className={style.followingSection}>
                    <h4 className={style.followingTitle}>팔로우 중 ({followingList.length})</h4>
                    <div className={style.followingList}>
                        {followingList.map((f) => (
                            <div key={String(f.id)} className={style.followingItem}
                                 onClick={() => router.push(`/${f.email}`)}>
                                <img src={f.statusImg} alt={f.nickname} className={style.followingAvatar}/>
                                <span className={style.followingNickname}>{f.nickname}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    )}
    else{
        return (
            <main className={style.main}>
                <div className={style.header}>
                    <BackButton/>
                    <h3 className={style.headerTitle}>{userToFind.nickname}</h3>
                </div>
                <div className={style.userZone}>
                    <div className={style.userImage}>
                        <img src={userToFind.statusImg} alt={''}/>
                    </div>
                    <div className={style.userName}>
                        <div>{userToFind.nickname}</div>
                        <div>{userToFind.email}</div>
                    </div>
                    <button
                        className={isFollowing ? style.unfollowButton : style.followButton}
                        onClick={onClickFollow}
                        disabled={followLoading}
                    >
                        {isFollowing ? '언팔로우' : '팔로우'}
                    </button>
                    <button className={style.chatButton} onClick={onClickChat}>쪽지</button>
                </div>
                <div className={style.statusContainer}>
                    <h4>하나님과의 친밀도</h4>
                    <div className={style.progressContainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#e3e3e3" width="30px" height="30px"
                             viewBox="0 0 24 24">
                            <path
                                d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"/>
                        </svg>
                        <progress value={userToFind.intimacy} max="200"/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#f95959" width="30px" height="30px"
                             viewBox="0 0 24 24">
                            <path
                                d="M20.808,11.079C19.829,16.132,12,20.5,12,20.5s-7.829-4.368-8.808-9.421C2.227,6.1,5.066,3.5,8,3.5a4.444,4.444,0,0,1,4,2,4.444,4.444,0,0,1,4-2C18.934,3.5,21.773,6.1,20.808,11.079Z"/>
                        </svg>
                    </div>
                    {/*<PostAbstract post={}/>*/}


                </div>
            </main>
        )
    }
}