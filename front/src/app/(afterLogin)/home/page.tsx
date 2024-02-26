"use client";
import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import {useEffect, useState} from "react";
import {getCurrentUserInfo} from "@/app/(afterLogin)/_lib/MemberApi";
import { Member} from "@/app/_component/MemberRecoilState";
import {useRecoilState, useRecoilValue} from "recoil";
import {useRouter} from "next/navigation";
import {getPosts, getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import {da} from "@faker-js/faker";
import Loader from "@/app/_component/Loader";

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
    }, [member,setMemberInfo]);

    useEffect(() => {
        const fetchPosts = async () => {
            let page = 1;
            const { success, data } = await getTodayPosts({ accessToken, refreshToken, page });

            if (success) {
                setPosts(data);
            }
        };

        fetchPosts();
        router.refresh();
    }, [accessToken, refreshToken,router]);
    const fetchPosts = async () => {
        let page = 1;
        const { success, data } = await getPosts({ accessToken, refreshToken, page });

        if (success) {
            setPosts(data);

        }
    };
    const fetchTdyPosts = async () => {
        let page = 1;
        const { success, data } = await getTodayPosts({ accessToken, refreshToken, page });

        if (success) {
            setPosts(data);
        }
    };

    console.log(posts)

    if (posts.length ===0) {
        return (
            <Loader/>
        )
    }


        return (

            <main className={style.main}>
                <TabProvider>
                    <Tab fetchPosts={fetchPosts} fetchTdyPosts={fetchTdyPosts}/>
                    <div className={style.postContainer}>
                        {posts.length > 0 && (
                            <>
                                <PostAbstract post={posts[0]}/>
                                {posts.length > 1 && (
                                    <PostAbstract post={posts[1]}/>
                                )}
                                    {posts.length > 2 && (
                                        <PostAbstract post={posts[2]}/>
                                    )}
                                        {posts.length > 3 && (
                                            <PostAbstract post={posts[3]}/>
                                        )}
                                            {posts.length > 4 && (
                                                <PostAbstract post={posts[4]}/>
                                            )}
                                                {posts.length > 5 && (
                                                    <PostAbstract post={posts[5]}/>
                                                )}
                                                    {posts.length > 6 && (
                                                        <PostAbstract post={posts[6]}/>
                                                    )}
                                                        {posts.length > 7 && (
                                                            <PostAbstract post={posts[7]}/>
                                                        )}
                                                            {posts.length > 8 && (
                                                                <PostAbstract post={posts[8]}/>
                                                            )}
                                                                {posts.length > 9 && (
                                                                    <PostAbstract post={posts[9]}/>
                                                                )}
                            {/* Empty Space needed*/}

                            </>
                        )}
                    </div>
                </TabProvider>
            </main>
        )


}