"use client";

import PostDetails from "@/app/(afterLogin)/_component/PostDetails";
import style from "./myAmad.module.css"
import AmadDetail from "./_component/AmadDetail";
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState";
import {useEffect, useState} from "react";
import {getLastPosts, getPostDetail, getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";
import Loader from "@/app/_component/Loader";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {patchAmadAccomplished} from "@/app/(afterLogin)/_lib/AmadApi";
import {da} from "@faker-js/faker";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import ComponentLoader from "@/app/_component/ComponentLoader";

type Props = {
    post: any,
}
export default function MyAmad() {

    const member = useRecoilValue(Member);
    const email = member.email;
    const [isClient, setIsClient] = useState(false);

    const [post, setPost] = useState<Props | null>(null);

    const [myAmadId, setMyAmadId] = useState<bigint>(BigInt(0));

    const [myAmad, setMyAmad] = useState('')
    const [myAmadIsComplete, setMyAmadIsComplete] = useState(false);

    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [createdAt, setCreatedAt ] = useState('');
    const [posts, setPosts] = useState([]);

    const tdy = new Date();
    const year = tdy.getFullYear();
    const month = tdy.getMonth()+1 <10 ? '0'+(tdy.getMonth()+1): tdy.getMonth()+1;
    const day = tdy.getDate()
    const today = year+'-'+month+'-'+day;
    const OnClickAccomplished = () => {

            const requestBody={
                mission: myAmad,
                complete: true
            }
            const fetchPost = async () => {
                const { success, data } = await patchAmadAccomplished({ requestBody,accessToken, refreshToken, myAmadId });

                if (success) {
                    setMyAmadIsComplete(data.complete);

                }

            };
            fetchPost();
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
        setIsClient(true)
            setAccessToken( localStorage.getItem("Authorization") || '');
            setRefreshToken(localStorage.getItem("Refresh") || '');
            }
    }, [isClient]);

    useEffect(() => {
        const fetchPosts = async () => {
            let page = 1;
            const { success, data } = await getLastPosts({ accessToken, refreshToken, page, email });

            if (success) {
                setPosts(data);
            }
        };

        fetchPosts();
    }, [accessToken, refreshToken]);

    useEffect(() => {
        if (email) {
            const fetchPost = async () => {

                const { success, data } = await getPostDetail({ accessToken, refreshToken, email });

                if (success) {
                    setPost(data);
                    setMyAmad(data.myAmad);
                    setMyAmadId(data.myAmadId);
                    setMyAmadIsComplete(data.complete);
                    const createdAt = data.createdAt.split("T")[0];
                    setCreatedAt(createdAt)
                    // console.log(data.complete);
                }
            };

            fetchPost();
        }
    }, []); // Run only when email changes




    // if (!post) {
    //     return(
    //         <Loader header = {'오늘 묵상을 완료하세요!'} body={'매일의 묵상을 통해 하나님과 친밀한 관계를 유지하세요.'}/>)
    // }


    return (
        <main className={style.main}>

                <div className={style.container}>
                        <BackButton/>
                    <div className={style.container}>
                        <h3>오늘 나의 묵상</h3>
                        &nbsp;
                        {post && <>
                            <PostArticle post={post}>
                                <PostDetails post={post} email={email}/>
                            </PostArticle>

                            <div className={style.container}>
                                <h3>오늘 나의 AMAD</h3>
                            </div>
                            <div className={style.amadContainer}>
                                <AmadDetail myAmad={myAmad} isComplete={myAmadIsComplete}/>
                                {!myAmadIsComplete &&
                                    <button type="button" onClick={OnClickAccomplished}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                             viewBox="0 0 24 24" fill="none">
                                            <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000"/>
                                        </svg>
                                    </button>}
                            </div>
                        </>
                        }

                        {!post &&
                            <div className={style.noPostContainer}>
                            <ComponentLoader header={'오늘 묵상을 완료하세요!'} body={'매일의 묵상을 통해 하나님과 친밀한 관계를 유지하세요.'}/>
                        </div>
                        }
                    </div>
                </div>
            <div className={style.container}>
                <h3>지난 묵상들</h3>
                {posts.length ===0&& <>
                    <div className={style.noPostContainer}>
                        <ComponentLoader header={'지난 묵상이 없습니다. '} body={'매일의 묵상을 통해 하나님과 친밀한 관계를 유지하세요.'}/>
                    </div>
                </>}
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
        </main>
);
}