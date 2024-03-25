"use client";
import BackButton from "@/app/(afterLogin)/_component/BackButton";
import PostDetails from "@/app/(afterLogin)/_component/PostDetails";
import style from './singlePost.module.css';
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";
import {useEffect, useState} from "react";
import {getPostDetail, getTodayPosts} from "@/app/(afterLogin)/_lib/PostApi";
import Loader from "@/app/_component/Loader";
import {usePathname, useRouter} from "next/navigation";
import Comment from "@/app/(afterLogin)/_component/Comment";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import {getComments} from "@/app/(afterLogin)/_lib/CommentApi";
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState";

type Props = {
    post:{
        id: bigint,
        title:string,
        writer: string,
        nickname: string,
        statusImg: string,
        createdAt: string,
        scripts: [{
            bibleChapterVerseId: bigint,
            bible: string,
            bibleChapter: number,
            bibleVerseFrom: number,
            bibleVerseTo: number,
            script: string
        }],
        likes: number,
        commentsNum: number,
        content_1: string,
        content_2: string,
        content_3: string,
        content_4: string,
        content_5: string,
        myAmad:string,
        myAmadId: bigint,
        complete: boolean
        whoLikesMyPost:BigInt[]
    },
}

export default function SinglePost() {
    const loginUser = useRecoilValue(Member);
    const me = loginUser.email;
    const [post, setPost] = useState<Props | null>(null);
    const pathname = usePathname();
    const parts = pathname.split("/"); // Split the pathname by "/"
    const [postId, setPostId] = useState<bigint>(BigInt(0));
    const [email, setEmail] = useState('');
    const [comments, setComments]= useState([]);
    const accessToken = localStorage.getItem("Authorization") ||'';
    const refreshToken = localStorage.getItem("Refresh") ||'';
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(0);

    const [isPatched, setIsPatched] = useState(false);

    useEffect(() => {

    if(parts[parts.length - 1] != 'amad'){
        setPostId(BigInt(parts[parts.length - 1]))
    }
    },[])
    const onCommentPatched = () => {
        // Set a flag to indicate that comments have changed
        setIsPatched(true);
    };

    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {

                const { success, data, error } = await getPostDetail({ accessToken, refreshToken, postId});

                if (success) {
                    setPost(data);
                    setEmail(data.writer);
                }
                if(!success && error === '409'){
                    console.log("login failed");
                    router.replace('/')
                }
            };

            fetchPost();
        }
    }, [postId, comments]);

    useEffect(() => {
        if (postId) {
            fetchComments(); // Fetch comments initially
        }
    }, [postId, page]);

    useEffect(() => {
        if (isPatched) {
            fetchComments();
            setIsPatched(false);
        }
    }, [isPatched]);

    const fetchComments = async () => {
        
        const { success, data, error } = await getComments({ accessToken, refreshToken, postId, page });

        if (success) {
            setComments(data.responses);
            setTotalPage(data.totalPage)
        }
        if(!success && error === '409'){
            console.log("login failed");
            router.replace('/')
        }
    };

    const onClickButtonNext = () => {
        setPage((prevPage)=> prevPage+1);
    }
    const onClickButtonPrev = () => {
        if(page != 1){
        setPage((prevPage)=> prevPage-1);
        }
    }



    if (!post) {
        return(
       <Loader/>)
        }

    return (
        <div className={style.main}>
            <div className={style.header}>
                <BackButton />
                <h3 className={style.headerTitle}>게시하기</h3>
            </div>
            <PostDetails post={post} />
            <CommentForm postId={postId} onCommentAdded={fetchComments}/>
            <div className={style.commentSection}>
                <h3>답글</h3>
                {comments.length > 0 && (
                    <div className={style.commentInputSection}>

                {comments && (
                        <>
                            {comments.map((comment, index) => (
                                <Comment key={index} me={me} onCommentPatched={onCommentPatched} comment={comment}/>
                            ))}
                            {/* <div ref={myRef} className={style.observer}></div> */}
                        </>
                    )}

                    </div>
                )}
            </div>
           {comments.length > 0 && ( 
            <>
            <div className={style.seeMoreButtonSection}>

                <button disabled={page === 1} className={style.seeMoreButton} onClick={onClickButtonPrev}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                    <polyline fill="none" stroke={page !== 1 ? "#000000" : "#e3e3e3"} strokeWidth="2" points="7 2 17 12 7 22" transform="matrix(-1 0 0 1 24 0)" />
                </svg>
                </button>
               <button disabled={page===totalPage} className={style.seeMoreButton} onClick={onClickButtonNext}>
               <svg xmlns="http://www.w3.org/2000/svg" fill={page !== totalPage ? "#000000" : "#e3e3e3"} height="20px" width="20px" version="1.1" id="XMLID_287_" viewBox="0 0 24 24" >
                <g id="next"><g>
		        <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "/></g></g>
                </svg>
                </button>
            </div>
            </>
            )}
        </div>
    )
}