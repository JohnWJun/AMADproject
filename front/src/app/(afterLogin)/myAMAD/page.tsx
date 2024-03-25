"use client";

import PostDetails from "@/app/(afterLogin)/_component/PostDetails";
import style from "./myAmad.module.css"
import AmadDetail from "./_component/AmadDetail";
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState";
import {useEffect, useState} from "react";
import {getLastPosts, getPostTdyDetail, deletePost} from "@/app/(afterLogin)/_lib/PostApi";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import {patchAmadAccomplished} from "@/app/(afterLogin)/_lib/AmadApi";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import ComponentLoader from "@/app/_component/ComponentLoader";
import { useRouter} from "next/navigation";

type Props = {
    post: any,
}
interface Post{
    id:bigint,
    title:string,
    writer:string,
    nickname:string,
    statusImg:string,
    createdAt:string,
    content_1:string,
    myAmad:string,
    likes:number,
    commentsNum: number,
    whoLikesMyPost:BigInt[]
}
export default function MyAmad() {

    const member = useRecoilValue(Member);
    const email = member.email;
    const memberId = member.id;
    const [isClient, setIsClient] = useState(false);

    const [post, setPost] = useState<Props | null>(null);

    const [myAmadId, setMyAmadId] = useState<bigint>(BigInt(0));

    const [myAmad, setMyAmad] = useState('')
    const [myAmadIsComplete, setMyAmadIsComplete] = useState(false);

    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [createdAt, setCreatedAt ] = useState('');
    const [posts, setPosts] = useState<Post[]|null>(null);
    const router = useRouter();
    const [isFetched, setIsFetched] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

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
                const { success, data, error } = await patchAmadAccomplished({ requestBody,accessToken, refreshToken, myAmadId });

                if (success) {
                    setMyAmadIsComplete(data.complete);

                }
                if(!success && error === '409'){
                    console.log("login failed");
                    router.replace('/')
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
            
            const { success, data, error } = await getLastPosts({ accessToken, refreshToken, page, email });

            if (success) {
                setPosts(data.posts);
                setTotalPage(data.totalPage);
            }
            if(!success && error === '409'){
                console.log("login failed");
                router.replace('/')
            }
        };

        fetchPosts();
        setIsFetched(false);
    }, [accessToken, refreshToken, isFetched, page]);

    useEffect(() => {
        if (memberId) {
            const fetchPost = async () => {

                const { success, data, error } = await getPostTdyDetail({ accessToken, refreshToken, memberId });

                if (success) {
                    setPost(data);
                    setMyAmad(data.myAmad);
                    setMyAmadId(data.myAmadId);
                    setMyAmadIsComplete(data.complete);
                    const createdAt = data.createdAt.split("T")[0];
                    setCreatedAt(createdAt);

                }
                if(!success && error === '409'){
                    console.log("login failed");
                    router.replace('/')
                }
            };

            fetchPost();
            setIsFetched(false);
        }
    }, [memberId, isFetched]);


    const onClickDelete = (id:bigint)=>{
        if(confirm('삭제하시면 복구할수 없습니다.\n정말로 삭제하시겠습니까??')){
            fetchDeletePost(id);
        }
        
    }
    const fetchDeletePost = async(id:bigint) => {
        const postId = id;
        const {success, error} = await deletePost({accessToken,refreshToken, postId});
        if(success) {
            setIsFetched(true);
          }
          if(!success && error === '409'){
            console.log("login failed");
            router.replace('/')
        }
    }

    const onClickButtonNext = () => {
        setPage((prevPage)=> prevPage+1);
    }
    const onClickButtonPrev = () => {
        if(page != 1){
        setPage((prevPage)=> prevPage-1);
        }
    }


    return (
        <main className={style.main}>

                <div className={style.container}>
                        <BackButton/>
                    <div className={style.container}>
                        <h3>오늘 나의 묵상</h3>
                        &nbsp;
                        {post && <>
                            {/* <PostArticle post={post}> */}
                                <PostDetails post={post}/>
                            {/* </PostArticle> */}

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
                {posts !== null && posts.length ===0&& <>
                    <div className={style.noPostContainer}>
                        <ComponentLoader header={'지난 묵상이 없습니다. '} body={'매일의 묵상을 통해 하나님과 친밀한 관계를 유지하세요.'}/>
                    </div>
                </>}
                {posts !== null && posts.length > 0 && (
                    <>
                    <div className={style.myLastPostsContainer}>
                    <div className={style.postAbstract}>
                        {posts.map((post, index) => (
                        <div key={post.id} className={style.lastPostBox}>
                            <div className={style.contentBox}>
                            <PostAbstract key={index} post={post}/>
                            </div>
                            <div className={style.deleteButtonSection}>
                            <button onClick={() => onClickDelete(post.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.0" id="Layer_1" width="20px" height="20px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" >
                                <g>
                                    <path d="M56,4H40c0-2.211-1.789-4-4-4h-8c-2.211,0-4,1.789-4,4H8C5.789,4,4,5.789,4,8v5c0,0.553,0.447,1,1,1h54   c0.553,0,1-0.447,1-1V8C60,5.789,58.211,4,56,4z"/>
                                    <path d="M20,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C21,24.447,20.553,24,20,24z"/>
                                    <path d="M32,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C33,24.447,32.553,24,32,24z"/>
                                    <path d="M44,24c-0.553,0-1,0.447-1,1v26c0,0.553,0.447,1,1,1s1-0.447,1-1V25C45,24.447,44.553,24,44,24z"/>
                                    <path d="M9,16H7v44c0,2.211,1.789,4,4,4h42c2.211,0,4-1.789,4-4V16h-2H9z M23,51c0,1.657-1.343,3-3,3s-3-1.343-3-3   V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M35,51c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z M47,51   c0,1.657-1.343,3-3,3s-3-1.343-3-3V25c0-1.657,1.343-3,3-3s3,1.343,3,3V51z"/>
                                </g>
                                </svg>
                                </button>
                            </div>
                            
                    </div>
                        ))}
                        {posts.length > 0 && (
                            <div className={style.paginationButtonSection}>
                            <button disabled={page === 1} className={style.paginationButton} onClick={onClickButtonPrev}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                                    <polyline fill="none" stroke={page !== 1 ? "#000000" : "#e3e3e3"} strokeWidth="2" points="7 2 17 12 7 22" transform="matrix(-1 0 0 1 24 0)" />
                                </svg>
                            </button>
                            <button disabled={page===totalPage} className={style.paginationButton} onClick={onClickButtonNext}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill={page !== totalPage ? "#000000" : "#e3e3e3"} height="20px" width="20px" version="1.1" id="XMLID_287_" viewBox="0 0 24 24" >
                                <g id="next"><g>
                                <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "/></g></g>
                                </svg>
                            </button>
                            </div>
                            )}
                    </div>
                
                    </div>
                    </>
                )}
                
            </div>
        </main>
);
}