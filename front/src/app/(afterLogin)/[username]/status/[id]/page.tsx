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
        content_1: string,
        content_2: string,
        content_3: string,
        content_4: string,
        content_5: string,
        myAmad:string,
        myAmadId: bigint,
        complete: boolean
    },
}

export default function SinglePost() {
    const loginUser = useRecoilValue(Member);
    const me = loginUser.email;
    const [memberId, setMemberId] = useState(BigInt(0));
    const [post, setPost] = useState<Props | null>(null);
    const [postId, setPostId] = useState(BigInt(0));
    const pathname = usePathname();
    const parts = pathname.split("/"); // Split the pathname by "/"
    const id = parts[parts.length - 1];
    const [email, setEmail] = useState('');
    const [comments, setComments]= useState([]);
    const accessToken = localStorage.getItem("Authorization") ||'';
    const refreshToken = localStorage.getItem("Refresh") ||'';
    const router = useRouter();

    useEffect(() => {
        if (id !=undefined) {
            setMemberId(BigInt(id));
        }
    }, [id]); // Empty dependency array to ensure this runs only once on initial render

    useEffect(() => {
        if (memberId) {
            console.log(memberId)
            const fetchPost = async () => {

                const { success, data } = await getPostDetail({ accessToken, refreshToken, memberId });

                if (success) {
                    setPost(data);
                    setEmail(data.writer);
                    setPostId(data.id)
                }
            };

            fetchPost();
        }
    }, [memberId]);

    useEffect(() => {
        if (postId) {
            fetchComments(); // Fetch comments initially
        }
    }, [postId, comments]);

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
                        <Comment me={me} onCommentPatched={fetchComments} comment={comments[0]}/>
                        {comments.length > 1 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[1]}/>
                        )}
                        {comments.length > 2 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[2]}/>
                        )}
                        {comments.length > 3 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[3]}/>
                        )}
                        {comments.length > 4 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[4]}/>
                        )}
                        {comments.length > 5 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[5]}/>
                        )}
                        {comments.length > 6 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[6]}/>
                        )}
                        {comments.length > 7 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[7]}/>
                        )}
                        {comments.length > 8 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[8]}/>
                        )}
                        {comments.length > 9 && (
                            <Comment me={me} onCommentPatched={fetchComments} comment={comments[9]}/>
                        )}
                        {/* Empty Space needed*/}

                    </div>
                )}


            </div>
        </div>
    )
}