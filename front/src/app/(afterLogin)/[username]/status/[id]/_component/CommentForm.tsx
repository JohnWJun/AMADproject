"use client";

import {ChangeEventHandler, FormEventHandler, useRef, useState} from "react";
import style from './commentForm.module.css';
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState";
import {postPost} from "@/app/(afterLogin)/_lib/PostApi";
import {postComment} from "@/app/(afterLogin)/_lib/CommentApi";
import {useRouter} from "next/navigation";

type Props = {
    postId: bigint,
    onCommentAdded: () => void // Callback function to notify parent about newly added comment
}

export default function CommentForm({ postId, onCommentAdded }: Props) {
    const [content, setContent] = useState('');
    const imageRef = useRef<HTMLInputElement>(null);
    const me = useRecoilValue(Member);
    const memberId = me.id;
    const router = useRouter();

    const onClickButton = () => {}
    const onSubmit : FormEventHandler = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("Authorization") || '';
        const refreshToken = localStorage.getItem("Refresh") || '';

        console.log(memberId);
        console.log()

        const {success,data} = await postComment({content, accessToken, refreshToken, postId, memberId});
        if (success) {
            console.log(data);
            // Call the callback function provided by the parent component
            onCommentAdded();
            // Clear the content of the comment form after submission
            setContent('');
        }



    }
    const onChange : ChangeEventHandler<HTMLTextAreaElement> =(e) => {
        setContent(e.target.value);
    }


        return (
        <form className={style.postForm} onSubmit={onSubmit}>
            <div className={style.postUserSection}>
                <div className={style.postUserImage}>
                    <img src={me.statusImg} alt={me.nickname}/>
                </div>
            </div>
            <div className={style.postInputSection}>
                <textarea value={content} onChange={onChange} placeholder="답글 게시하기"/>
                <div className={style.postButtonSection}>
                    <div className={style.footerButtons}>
                        <div className={style.footerButtonLeft}>
                            <input type="file" name="imageFiles" multiple hidden ref={imageRef}/>
                            <button className={style.uploadButton} type="button" onClick={onClickButton}>
                                <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                                    <g>
                                        <path
                                            d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <button type={"submit"} className={style.actionButton} disabled={!content}>답글</button>
                    </div>
                </div>
            </div>
        </form>
    );
}