"use client";
import style from './search.module.css';
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import Tab from "@/app/(afterLogin)/search/_component/Tab";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getPostBySearch } from "@/app/(afterLogin)/_lib/SearchApi";
import ComponentLoader from "@/app/_component/ComponentLoader";

interface Post {
    id: bigint;
    title: string;
    writer: string;
    nickname: string;
    statusImg: string;
    createdAt: string;
    content_1: string;
    myAmad: string;
    likes: number;
    commentsNum: number;
    whoLikesMyPost: BigInt[];
}

export default function Search() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || '';
    const f = searchParams.get('f') || '';
    const router = useRouter();

    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [isLast, setIsLast] = useState(false);
    const [searched, setSearched] = useState(false);

    const bottomRef = useRef<HTMLDivElement>(null);
    // Ref-based flag so the observer callback always sees the latest value
    // without being re-created on every state change
    const isLoadingRef = useRef(false);

    useEffect(() => {
        setAccessToken(localStorage.getItem("Authorization") || '');
        setRefreshToken(localStorage.getItem("Refresh") || '');
    }, []);

    // Reset when keyword or tab changes
    useEffect(() => {
        setPosts([]);
        setPage(1);
        setIsLast(false);
        setSearched(false);
        isLoadingRef.current = false;
    }, [q, f]);

    // Fetch whenever page, keyword, or tab changes
    useEffect(() => {
        if (!accessToken || !q) return;
        isLoadingRef.current = true;
        const fetch = async () => {
            const { success, data, error } = await getPostBySearch({
                accessToken, refreshToken, keyword: q, page, f: f || undefined,
            });
            if (success) {
                setPosts(prev => page === 1 ? data : [...prev, ...data]);
                if (data.length < 10) setIsLast(true);
            } else {
                if (error === '409') router.replace('/');
            }
            setSearched(true);
            isLoadingRef.current = false;
        };
        fetch();
    }, [accessToken, q, f, page]);

    // IntersectionObserver — only active after first page has loaded
    useEffect(() => {
        if (!searched || isLast) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingRef.current) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 0.5 }
        );

        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => { if (bottomRef.current) observer.unobserve(bottomRef.current); };
    }, [searched, isLast, page]);

    return (
        <main className={style.main}>
            <div className={style.searchTop}>
                <div className={style.searchZone}>
                    <div className={style.buttonZone}>
                        <BackButton />
                    </div>
                    <div className={style.formZone}>
                        <SearchForm q={q} />
                    </div>
                </div>
                <Tab />
            </div>
            <div className={style.list}>
                {searched && posts.length === 0 && (
                    <ComponentLoader header={`"${q}" 검색 결과가 없습니다.`} body="다른 키워드로 검색해보세요." />
                )}
                {posts.map((post, index) => (
                    <PostAbstract key={index} post={post} />
                ))}
                <div ref={bottomRef} style={{ height: 200 }} />
            </div>
        </main>
    );
}
