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
    // const [postId, setPostId] = useState(BigInt(0));
    const pathname = usePathname();
    const parts = pathname.split("/"); // Split the pathname by "/"
    const [postId, setPostId] = useState<bigint>(BigInt(0));
    const [email, setEmail] = useState('');
    const [comments, setComments]= useState([]);
    const accessToken = localStorage.getItem("Authorization") ||'';
    const refreshToken = localStorage.getItem("Refresh") ||'';
    const router = useRouter();

    const [isPatched, setIsPatched] = useState(false);

    useEffect(() => {

    if(parts[parts.length - 1] != 'amad'){
        setPostId(BigInt(parts[parts.length - 1]))
    }
    },[])
    const onCommentPatched = () => {
        // Set a flag to indicate that comments have changed
        setIsPatched(true);
        console.log(isPatched)
    };

    useEffect(() => {
        if (postId) {
            const fetchPost = async () => {

                const { success, data } = await getPostDetail({ accessToken, refreshToken, postId});

                if (success) {
                    setPost(data);
                    setEmail(data.writer);
                }
            };

            fetchPost();
        }
    }, [postId, comments]);

    useEffect(() => {
        if (postId) {
            fetchComments(); // Fetch comments initially
        }
    }, [postId]);

    useEffect(() => {
        if (isPatched) {
            fetchComments();
            setIsPatched(false);
        }
    }, [isPatched]);

    const fetchComments = async () => {
        let page = 1;
        const { success, data } = await getComments({ accessToken, refreshToken, postId, page });

        if (success) {
            setComments(data);
        }
    };



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
            <PostDetails post={post} email={email} />
            <CommentForm postId={postId} onCommentAdded={fetchComments}/>
            <div>
                <h3>답글</h3>
                {comments.length > 0 && (
                    <div className={style.commentInputSection}>

                {comments && (
                        <>
                            {comments.map((comment, index) => (
                                <Comment key={index} me={me}onCommentPatched={onCommentPatched} comment={comment}/>
                            ))}
                            {/* <div ref={myRef} className={style.observer}></div> */}
                        </>
                    )}

                    </div>
                )}


            </div>
        </div>
    )
}