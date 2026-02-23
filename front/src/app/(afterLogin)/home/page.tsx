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
    // Ref so IntersectionObserver callback always sees the current loading state
    // without needing to be re-created on every render.
    const isLoadingRef = useRef(false);
    // Incremented on every tab click so the fetch effect re-runs even when
    // page and isTabtdy haven't changed (e.g. clicking the same tab twice).
    const [resetCount, setResetCount] = useState(0);

    // Called synchronously from the Tab click handler — before React processes
    // the batched state updates and before the DOM re-renders. Setting
    // isLoadingRef here ensures the IntersectionObserver cannot fire and
    // increment page while posts are being cleared and re-fetched.
    const onTabChange = () => {
        isLoadingRef.current = true;
        setResetCount(c => c + 1);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const storedAccessToken = localStorage.getItem("Authorization") || '';
            const storedRefreshToken = localStorage.getItem("Refresh") || '';

            const { success, data, error } = await getCurrentUserInfo({
                accessToken: storedAccessToken,
                refreshToken: storedRefreshToken,
                setMemberInfo
            });

            if(!success && error === '409'){
                console.log("login failed");
                router.replace('/')
            }

        };


        if (typeof window !== 'undefined') {
            fetchUserData();
        }
    }, []);


    // Fetch posts whenever page, accessToken, or active tab changes.
    // `cancelled` is set to true by the cleanup function when the effect
    // re-runs (tab switched, page changed) so stale responses are ignored.
    useEffect(() => {
        if (!accessToken) return;
        if (isLastPost) return;

        let cancelled = false;
        isLoadingRef.current = true;

        const doFetch = async () => {
            if (isTabtdy) {
                const { success, data, error } = await getTodayPosts({ accessToken, refreshToken, page });
                if (cancelled) return;
                if (success) {
                    setPosts(prevPosts => [...prevPosts, ...data]);
                    if (data.length < 3 || data.length === 0) setIsLastPost(true);
                } else {
                    setIsLastPost(true);
                    if (error === '409') router.replace('/');
                }
            } else {
                const { success, data, error } = await getPosts({ accessToken, refreshToken, page });
                if (cancelled) return;
                if (success) {
                    setPosts(prevPosts => [...prevPosts, ...data.posts]);
                    if (data.length < 3 || data.posts.length === 0) setIsLastPost(true);
                } else {
                    setIsLastPost(true);
                    if (error === '409') router.replace('/');
                }
            }
            isLoadingRef.current = false;
        };

        doFetch();

        return () => {
            cancelled = true;
            isLoadingRef.current = false;
        };
    }, [page, accessToken, isTabtdy, resetCount]);

    useEffect(() => {
        const entryCallback = (entries:any) => {
            const entry = entries[0];
            // Guard: do not increment page while a fetch is already in flight.
            // Without this, clearing posts (tab switch) makes the sentinel div
            // immediately visible and jumps page from 1 → 2 before page 1 loads.
            if (entry.isIntersecting && !isLoadingRef.current) {
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
    }, [page, isLastPost]);

    return (
        <main className={style.main}>
            <TabProvider>
                <Tab setIsLastPost={setIsLastPost} setPosts={setPosts} setPage={setPage} setIsTdy={setIsTabtdy} onTabChange={onTabChange}/>
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
