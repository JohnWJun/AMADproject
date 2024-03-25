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
import { useRouter} from "next/navigation";

interface Post {
    id:bigint,
    title:string,
    writer:string,
    nickname:string,
    statusImg:string,
    createdAt:string,
    content_1:string,
    myAmad:string,
    likes:number,
    commentsNum:number
    whoLikesMyPost:BigInt[];
}
export default function Home() {
    
    const router = useRouter();

    const [accessToken, setAcessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');

    useEffect(() => {
    if(typeof window !== "undefined"){
        const accessToken = localStorage.getItem("Authorization") || '';
        const refreshToken = localStorage.getItem("Refresh") || '';

        setAcessToken(accessToken);
        setRefreshToken(refreshToken);}
        },[]);

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
                const { success, data, error } = await getCurrentUserInfo({
                    accessToken: storedAccessToken,
                    refreshToken: storedRefreshToken,
                    setMemberInfo
                });

                if(!success && error === '409'){
                    console.log("login falied");
                    router.replace('/')
                }
            }
            
        };
        

        if (typeof window !== 'undefined') {
            fetchUserData();
        }
    }, [member, setMemberInfo]);


    useEffect(() => {
        if(accessToken)
        {
            if (isTabtdy) {
            fetchTdyPost();
        } else {
            fetchPost();
        }}

    }, [page,accessToken]);

    useEffect(() => {
        const entryCallback = (entries:any) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                setPage(prevPage => prevPage + 1);


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
        if(!isLastPost) {
        setIsLoading(true);
       const { success, data, error } = await getTodayPosts({ accessToken, refreshToken, page });

        if (success) {

            setPosts(prevPosts => [...prevPosts, ...data]);
            if (data.length < 3 || data.length === 0) {
                setIsLastPost(true);

            }
            setIsLoading(false);

        } else{
            setIsLastPost(true);
        }
    
        if(!success && error === '409'){
            console.log("login falied");
            router.replace('/')
        }
    }
    };

    const fetchPost = async () => {
        if(!isLastPost) {
        setIsLoading(true);
        const { success, data, error } = await getPosts({ accessToken, refreshToken, page });

        if (success) {
            setPosts(prevPosts => [...prevPosts, ...data.posts]);
            if (data.length < 3|| data.posts.length === 0) {
                setIsLastPost(true);

            }
            setIsLoading(false);
   
        } else{
            setIsLastPost(true);
        }
        if(!success && error === '409'){
            console.log("login failed");
            router.replace('/')
        }
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