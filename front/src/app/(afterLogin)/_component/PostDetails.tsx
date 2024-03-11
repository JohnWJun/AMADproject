import style from './post.module.css';
import Link from "next/link";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import {faker} from '@faker-js/faker';
import PostImages from "@/app/(afterLogin)/_component/PostImages";
import cx from "classnames";
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState";
import {deletePost} from "../_lib/PostApi";
import { useRouter} from "next/navigation";
import { useState } from 'react';

dayjs.locale('ko');
dayjs.extend(relativeTime)

type Props = {
    noImage?: boolean,
    post: any

}
export default function Post({ noImage ,post }: Props) {
    const target = post
    const memberInfo = useRecoilValue(Member);
    const loginEmail = memberInfo.email;
    const accessToken = localStorage.getItem("Authorization") ||'';
    const refreshToken = localStorage.getItem("Refresh") ||'';
    const postId = post.id;
    const router = useRouter();
    const onClickDelete = () =>{
        if(confirm('삭제하시면 복구할수 없습니다.\n정말로 삭제하시겠습니까??')){
            fetchDeletePost();
        }
    }

    const fetchDeletePost = async() => {
        const {success} = await deletePost({accessToken,refreshToken, postId});
        if(success) {
            router.push('/compose/amad');
            router.refresh();}
    }

        return (
                 
                <div className={style.postWrapper}>
                    <div className={style.postUserSection}>
                        <Link href={`/${target.writer}`} className={style.postUserImage}>
                            <img src={target.statusImg} alt={target.nickname}/>
                            <div className={style.postShade}/>
                        </Link>
                    </div>
                    
                    <div className={style.postBody}>
                        <div className={style.postMeta}>
                            <Link href={`/${target.writer}`}>
                                <span className={style.postUserName}>{target.nickname}</span>
                                &nbsp;
                                <span className={style.postUserId}>@{target.writer.replace('@gmail.com','')}</span>
                                &nbsp;
                                ·
                                &nbsp;
                            </Link>
                            <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
                            <div className={style.postFixButton}>
                                {post.writer === loginEmail &&(
                                    <>
                                         <button>
                                            <Link href={`/patch/amad/${target.id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                            viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" className="jam jam-write">
                                            <path
                                                d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/>
                                            </svg>
                                            </Link>
                                        </button>
                                        <button onClick={onClickDelete}>
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
                                    </>
                                    )}
                            </div>
                        </div>
                        
                        <div className={style.postContent}>
                            <h4>오늘 내게 주신 말씀</h4>
                            <span>{target.scripts[0].bible} {target.scripts[0].script}</span>
                            <h4>1. 말씀하시는 하나님은...</h4>

                            <span>{target.content_1}</span>

                            <h4>2. {target.content_1}이 이 말씀을 통해 하시고 싶은 말씀은?</h4>
                            <span>{target.content_2}</span>

                            <h4>3. {target.content_1}, <br/>이 말씀에 비추어 저는 어떤 삶을 살았습니까?</h4>
                            <span>{target.content_3}</span>

                            <h4>4. {target.content_1}, <br/>그럼에도 불구하고 주님은 저에게 어떻게 하셨습니까?</h4>
                            <span>{target.content_4}</span>

                            <h4>4. {target.content_1}, <br/>오늘 저는 어떤 삶을 살기 원하십니까?</h4>
                            <span>{target.content_5}</span>

                            <h4>오늘의 AMAD</h4>
                            <span>{target.myAmad}</span>
                            <div className={style.postImageSection}>
                                <PostImages post={target}/>
                            </div>
                        </div>
                        <ActionButtons whoLikesMyPost={post.whoLikesMyPost} likes={post.likes} commentsNum={post.commentsNum} postId={post.id}/>
                    </div>
                    
                </div>
                
                
        )

}