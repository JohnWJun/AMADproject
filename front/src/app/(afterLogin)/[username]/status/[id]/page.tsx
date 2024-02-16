"use client";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import PostDetails from "@/app/(afterLogin)/_component/PostDetails";
import style from './singlePost.module.css';
import Post from "@/app/(afterLogin)/_component/PostAbstract";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import {useEffect, useState} from "react";
import {getPostDetail, getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";

type Props = {
    noImage?: boolean,
    post: {
        id: bigint;
        title: string;
        writer: string;
        nickname: string;
        statusImg: string;
        createdAt: string;
        content_1: string;
        myAmad: string;
        likes: string;
    }
}

export default function SinglePost() {
    const [email, setEmail] = useState<string | null>(null);
    const [post, setPost] = useState<Props | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const emailParam = urlParams.get("email");
        if (emailParam) {
            setEmail(emailParam);
        }
    }, []); // Empty dependency array to ensure this runs only once on initial render

    useEffect(() => {
        if (email) {
            const fetchPosts = async () => {
                const accessToken = localStorage.getItem("Authorization");
                const refreshToken = localStorage.getItem("Refresh");
                const { success, data } = await getPostDetail({ accessToken, refreshToken, email });

                if (success) {
                    setPost(data);
                }
            };

            fetchPosts();
        }
    }, [email]); // Run only when email changes

    if (!post) {
        return(
        <div className={style.header}>
        <div>Loading...</div>
            </div>)
        }

    return (
        <div className={style.main}>
            <div className={style.header}>
                <BackButton />
                <h3 className={style.headerTitle}>게시하기</h3>
            </div>
            <PostDetails post={post} />
            <CommentForm />
            <div>
            </div>
        </div>
    )
}