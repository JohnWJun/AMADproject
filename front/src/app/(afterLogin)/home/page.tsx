"use client";
import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/PostAbstract";
// import GetPost from "@/app/(afterLogin)/home/_lib/GetPost";
import {useEffect, useState} from "react";
import {tr} from "@faker-js/faker";
import {getCurrentUserInfo} from "@/app/(afterLogin)/_lib/MemberApi";
import { Member} from "@/app/_component/MemberRecoilState";
import {useRecoilState, useRecoilValue} from "recoil";
import {router} from "next/client";
import {useRouter} from "next/navigation";
import {getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
// import Loading from "@/app/(afterLogin)/home/loading";
// import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";

export default function Home() {
    const router = useRouter();
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [posts, setPosts] = useState([]);
    const member = useRecoilValue(Member);
    const [memberInfo, setMemberInfo] = useRecoilState(Member);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedAccessToken = localStorage.getItem("Authorization") || '';
            const storedRefreshToken = localStorage.getItem("Refresh") || '';

            setAccessToken(storedAccessToken);
            setRefreshToken(storedRefreshToken);

            if (member.email === '') {
                const { success } = await getCurrentUserInfo({
                    accessToken: storedAccessToken,
                    refreshToken: storedRefreshToken,
                    setMemberInfo
                });
            }
        };

        if (typeof window !== 'undefined') {
            fetchUserData();
        }
    }, [member]);

    useEffect(() => {
        const fetchPosts = async () => {
            let page = 1;
            const { success, data } = await getTodayPosts({ accessToken, refreshToken, page });

            if (success) {
                setPosts(data);
            }
        };

        fetchPosts();
    }, [accessToken, refreshToken]);



        return (

            <main className={style.main}>
                <TabProvider>
                    <Tab/>
                    {/*<PostForm />*/}
                    <div className={style.postContainer}>
                        {/*<Suspense fallback={<Loading />}>*/}
                        {/*    <TabDeciderSuspense />*/}
                        {/*</Suspense>*/}
                        <PostAbstract noImage={false} post={posts[0]} />
                        <PostAbstract noImage={false} post={posts[1]} />


                    </div>

                </TabProvider>
            </main>
        )


}