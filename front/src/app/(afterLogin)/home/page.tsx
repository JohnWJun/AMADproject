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
import {da} from "@faker-js/faker";
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
    const observer = useRef<IntersectionObserver | null>(null);
    const [page, setPage] = useState(1);
    const [isTabtdy, setIsTabtdy] = useState(true);
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
        if (isTabtdy){
            const fetchPosts = async () => {

                const {success, data} = await getTodayPosts({accessToken, refreshToken, page});

                if (success) {
                    setPosts((prevPosts) => [...prevPosts, ...data]);
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
            setPosts(data);
        }
    };


    useEffect(() => {
        observer.current = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting) {
                    console.log('I got you')
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 0.2}
        );

        if (observer.current) {
            const element = document.getElementById("observer-element");
            if (element) {
                observer.current.observe(element);
            }
            const N = posts.length;
            const totalCount = 12;

            if (element && (0 === N || totalCount <= N)) {
                observer.current?.unobserve(element);
                console.log("here")

            }
        }


        // return () => {
        //     if (observer.current) {
        //         observer.current.disconnect();
        //     }
        // };
    }, [posts]);



        return (

            <main className={style.main}>
                <TabProvider>
                    <Tab fetchPosts={fetchPosts} fetchTdyPosts={fetchTdyPosts}/>
                    <div className={style.postContainer}>
                        {posts.length === 0 && (<><ComponentLoader/></>)}
                        {posts.map((post, index) => (
                            <PostAbstract key={index} post={post}/>
                        ))}

                    </div>
                    <div id="observer-element"></div>
                </TabProvider>
            </main>
        )


}