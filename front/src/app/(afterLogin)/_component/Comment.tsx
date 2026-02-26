"use client";
import style from "@/app/(afterLogin)/[username]/status/[id]/_component/commentForm.module.css";
import {ChangeEventHandler, useEffect, useState} from "react";
import {deleteComment, patchComment, postComment} from "@/app/(afterLogin)/_lib/CommentApi";
import {useRouter} from "next/navigation";
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState";

type Props={
    comment: any,
    me: string,
    onCommentPatched: () => void,
    depth?: number
}

export default function Comment({comment, me, onCommentPatched, depth = 0}:Props) {
    const [isMe, setIsMe] = useState(false);
    const [isEdit,setIsEdit] = useState(false);
    const [content, setContent] = useState(comment.mention);
    const [showReply, setShowReply] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const commentId = comment.id;
    const postId = comment.postId;
    const accessToken = localStorage.getItem("Authorization") || '';
    const refreshToken = localStorage.getItem("Refresh") || '';
    const router = useRouter();
    const loginUser = useRecoilValue(Member);


    useEffect(() => {
        if (me === comment.writer){
            setIsMe(true);
        }
    }, [comment.writer, me]);

    const onClickDeleteButton = () => {
        const fetchComment = async () => {
            const { success, error } = await deleteComment ({ accessToken, refreshToken, postId,commentId});

            if (success) {
                onCommentPatched();
                setIsEdit(false);
            }
            if(!success && error === '409'){
                console.log("login failed");
                router.replace('/')
            }
        }
        fetchComment();

    }

    const onClickSubmitButton = () => {

        const fetchComment = async () => {
            const { success, data, error } = await patchComment({ accessToken, refreshToken, postId,commentId, content});

            if (success) {
                onCommentPatched();
                setIsEdit(false);
            }
            if(!success && error === '409'){
                console.log("login failed");
                router.replace('/')
            }
        }
        fetchComment();

    }

    const onClickChangeButton = () =>{
        setIsEdit(true);
    }
    const onClickCancelButton = () =>{
        setIsEdit(false);
    }
    const onChange : ChangeEventHandler<HTMLTextAreaElement> =(e) => {
        setContent(e.target.value);
    }

    const onSubmitReply = async () => {
        const { success, error } = await postComment({
            content: replyContent,
            accessToken,
            refreshToken,
            postId: comment.postId,
            memberId: loginUser.id,
            parentId: Number(comment.id),
        });
        if (success) {
            setReplyContent('');
            setShowReply(false);
            onCommentPatched();
        }
        if (!success && error === '409') {
            router.replace('/');
        }
    };

    return(
        <div
            style={depth > 0 ? { marginLeft: `min(${depth * 30}px, calc(100% - 300px))`, minWidth: '300px' } : undefined}
            className={depth > 0 ? style.replyIndent : undefined}
        >
            <div className={style.postForm}>
                <div className={style.postUserSection}>
                    <div className={style.postUserImage}>
                    <img src={comment.statusImg} alt={comment.nickname}/>
                    </div>
                </div>
                    <div className={style.postInputSection}>
                        {comment.deleted
                            ? <span className={style.deletedComment}>삭제된 댓글입니다.</span>
                            : (!isEdit
                                ? <><strong>{comment.nickname}</strong> <br/> {comment.mention}</>
                                : <><textarea value={content} onChange={onChange}/></>)
                        }
                    </div>
                {isMe && !comment.deleted && (
                    <div className={style.patchDeleteButtons}>
                        {!isEdit && (
                            <>
                                <button type="button" onClick={onClickChangeButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                         viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" className="jam jam-write">
                                        <path
                                            d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/>
                                    </svg>
                                </button>
                                <button type="button" onClick={onClickDeleteButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="20px" height="20px" viewBox="0 0 512 512" version="1.1">
                                        <g id="Page-1" stroke="none" fill="none">
                                            <g id="work-case" fill="#000000"
                                               transform="translate(91.520000, 91.520000)">
                                                <polygon id="Close"
                                                         points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

                                                </polygon>
                                            </g>
                                        </g>
                                    </svg>
                                </button>

                            </>)}
                        {isEdit && (
                            <>
                                <button type="button" onClick={onClickSubmitButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                         viewBox="0 0 24 24" fill="none">
                                        <path d="M4 12.6111L8.92308 17.5L20 6.5" stroke="#000000"/>
                                    </svg>
                                </button>
                                <button type="button" onClick={onClickCancelButton}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         width="20px" height="20px" viewBox="0 0 512 512" version="1.1">
                                        <g id="Page-1" stroke="none" fill="none">
                                            <g id="work-case" fill="#000000"
                                               transform="translate(91.520000, 91.520000)">
                                                <polygon id="Close"
                                                         points="328.96 30.2933333 298.666667 1.42108547e-14 164.48 134.4 30.2933333 1.42108547e-14 1.42108547e-14 30.2933333 134.4 164.48 1.42108547e-14 298.666667 30.2933333 328.96 164.48 194.56 298.666667 328.96 328.96 298.666667 194.56 164.48">

                                                </polygon>
                                            </g>
                                        </g>
                                    </svg>
                                </button>

                            </>)}
                    </div>
                )}
            </div>
            {!comment.deleted && (
                <button className={style.replyButton} onClick={() => {
                    if (!loginUser.email) {
                        router.push('/i/flow/signup');
                        return;
                    }
                    setShowReply(v => !v);
                }}>답글 달기</button>
            )}
            {showReply && (
                <div className={style.replyForm}>
                    <textarea
                        value={replyContent}
                        onChange={e => setReplyContent(e.target.value)}
                        placeholder="답글을 입력하세요..."
                        rows={2}
                    />
                    <div>
                        <button className={style.replySubmit} onClick={onSubmitReply}
                                disabled={!replyContent.trim()}>게시</button>
                        <button className={style.replyCancel} onClick={() => setShowReply(false)}>취소</button>
                    </div>
                </div>
            )}
            {comment.replies?.map((reply: any) => (
                <Comment key={reply.id} comment={reply} me={me}
                         onCommentPatched={onCommentPatched} depth={(depth ?? 0) + 1} />
            ))}
        </div>
    )

}
