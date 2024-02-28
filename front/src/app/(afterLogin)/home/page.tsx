"use client";
import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import {useEffect, useRef, useState} from "react";
import {getCurrentUserInfo} from "@/app/(afterLogin)/_lib/MemberApi";
import { Member} from "@/app/_component/MemberRecoilState";
import {useRecoilState, useRecoilValue} from "recoil";
import {useRouter} from "next/navigation";
import {getPosts, getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import {da, tr} from "@faker-js/faker";
import Loader from "@/app/_component/Loader";
import ComponentLoader from "@/app/_component/ComponentLoader";

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

    useEffect(() => {
        console.log('order 1')
        const observer = new IntersectionObserver(entries => {
            const entry = entries[0];
            if(entry.isIntersecting) {
                if (page === 1) {
                    setPage(2);
                } else {
                    setPage((prevPage) => prevPage + 1);
                }
                console.log('page: ', page);
                console.log('entry: ', entry);
            }
        },{ threshold: 0.5})
        if(myRef.current){
            observer.observe(myRef.current);
        }
        if(myRef.current && isLastPost){
            observer.unobserve(myRef.current);
        }

    }, [posts]);

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
    }, [member,setMemberInfo]);

    useEffect(() => {
        console.log('order 2')
        if (isTabtdy){
            const fetchPosts = async () => {

                const {success, data} = await getTodayPosts({accessToken, refreshToken, page});

                if (success) {
                    setPosts((prevPosts) => [...prevPosts, ...data]);
                    if (data.length < 3) {
                        setIsLastPost(true);
                        console.log('its the last page', page);
                    }

                    console.log('useEffect getTodayPosts activated: ', data);
                }
            }
            fetchPosts();
        } else {
            const fetchPosts = async () => {

                const {success, data} = await getPosts({accessToken, refreshToken, page});

                if (success) {
                    setPosts((prevPosts) => [...prevPosts, ...data]);
                }
            }
            fetchPosts();
        }


    }, [page]);

    console.log('updated posts',posts);
    const fetchPosts = async () => {
        const renewPage = 1;
        setPage(renewPage);
        console.log('after fetchPosts page: '+ page);
        const { success, data } = await getPosts({ accessToken, refreshToken, page });

        if (success) {
            setIsTabtdy(false);
            setPosts(data);

        }
    };
    const fetchTdyPosts = async () => {
        const renewPage = 1;
        setPage(renewPage);
        console.log('After fetchTdyPosts : '+page)
        const { success, data } = await getTodayPosts({ accessToken, refreshToken, page });

        if (success) {
            setIsTabtdy(true);
            console.log('tab getTodayPosts activated')
            setPosts(data);
        }
    };






        return (

            <main className={style.main}>
                <TabProvider>
                    <Tab fetchPosts={fetchPosts} fetchTdyPosts={fetchTdyPosts}/>
                    <div className={style.postContainer}>
                        {posts.length === 0 && (<><ComponentLoader body={'오늘 아직 아무도 묵상을 완료하지 않았네요..'}/></>)}
                        {posts && <>
                        {posts.map((post, index) => (
                            <PostAbstract key={index} post={post}/>
                        ))}
                        <div ref={myRef}  className={style.observer}></div>
                        </>}
                    </div>

                </TabProvider>
            </main>
        )


}