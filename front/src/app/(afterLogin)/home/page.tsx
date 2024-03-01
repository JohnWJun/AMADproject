"use client";
import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import {useEffect, useRef, useState} from "react";
import {getCurrentUserInfo} from "@/app/(afterLogin)/_lib/MemberApi";
import { Member} from "@/app/_component/MemberRecoilState";
import {useRecoilState, useRecoilValue} from "recoil";
import {getPosts, getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import ComponentLoader from "@/app/_component/ComponentLoader";
import {tr} from "@faker-js/faker";

interface Post {
    id:bigint,
    title:string,
    writer:string,
    nickname:string,
    statusImg:string,
    createdAt:string,
    content_1:string,
    myAmad:string,
    likes:string,
}
export default function Home() {

    const accessToken = localStorage.getItem("Authorization") || '';
    const refreshToken = localStorage.getItem("Refresh") || '';
    const [posts, setPosts] = useState<Post[]>([]);
    const member = useRecoilValue(Member);
    const [memberInfo, setMemberInfo] = useRecoilState(Member);
    const myRef = useRef() as any;
    const [page, setPage] = useState(1);
    const [isTabtdy, setIsTabtdy] = useState(true);
    const [isLastPost, setIsLastPost] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const storedAccessToken = localStorage.getItem("Authorization") || '';
            const storedRefreshToken = localStorage.getItem("Refresh") || '';

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
    }, [member, setMemberInfo]);

    useEffect(() => {
        if (isTabtdy) {
            fetchTdyPost();
        } else {
            fetchPost();
        }
    }, [page]);

    useEffect(() => {
        const entryCallback = (entries:any) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setPage(prevPage => prevPage + 1);


                console.log('page: ', page);
                console.log('entry: ', entry);
            }
        };

        const options = { threshold: 0.5 };
        const observer = new IntersectionObserver(entryCallback, options);

        if (myRef.current && !isLastPost) {
            observer.observe(myRef.current);
        }

        return () => {
            if (myRef.current) {
                observer.unobserve(myRef.current);
            }
        };
    }, [page]);

    const fetchTdyPost = async () => {
        setIsLoading(true);
        const { success, data } = await getTodayPosts({ accessToken, refreshToken, page });

        if (success) {

            setPosts(prevPosts => [...prevPosts, ...data]);
            if (data.length < 3) {
                setIsLastPost(true);
                console.log('its the last page', page);
            }
            setIsLoading(false);
            console.log('infinite getTodayPosts activated: ', data);
        }
    };

    const fetchPost = async () => {
        setIsLoading(true);
        const { success, data } = await getPosts({ accessToken, refreshToken, page });

        if (success) {
            setPosts(prevPosts => [...prevPosts, ...data]);
            if (data.length < 3) {
                setIsLastPost(true);
                console.log('its the last page', page);
            }
            setIsLoading(false);
            console.log('infinite getPosts activated: ', data);
        }
    };

    return (
        <main className={style.main}>
            <TabProvider>
                <Tab setIsLastPost={setIsLastPost} setPosts={setPosts} setPage={setPage} setIsTdy={setIsTabtdy}/>
                <div className={style.postContainer}>
                    {posts.length === 0 && (
                        <ComponentLoader body={'오늘 아직 아무도 묵상을 완료하지 않았네요..'}/>
                    )}
                    {posts && (
                        <>
                            {posts.map((post, index) => (
                                <PostAbstract key={index} post={post}/>
                            ))}
                            <div ref={myRef} className={style.observer}></div>
                        </>
                    )}
                </div>
            </TabProvider>
        </main>
    );
}