import style from './post.module.css';
import Link from "next/link";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ko';
import ActionButtons from "@/app/(afterLogin)/_component/ActionButtons";
import PostArticle from "@/app/(afterLogin)/_component/PostArticle";
import {faker} from '@faker-js/faker';
import PostImages from "@/app/(afterLogin)/_component/PostImages";
import cx from "classnames";

dayjs.locale('ko');
dayjs.extend(relativeTime);
dayjs.extend(utc);
type Props = {
    post:{
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
}


export default function PostAbstract({ post }: Props) {


    return (
        
            <div className={style.postWrapper}>
                <div className={style.postUserSection}>
                    <Link href={`/${post.writer}`} className={style.postUserImage}>
                        <img src={post.statusImg} alt={post.nickname}/>
                        <div className={style.postShade}/>
                    </Link>
                </div>
                <div className={style.postBody}>
                <PostArticle post={post}>
                    <div className={style.postMeta}>
                        <Link href={`/${post.writer}`}>
                            <span className={style.postUserName}>{post.nickname}</span>
                            &nbsp;
                            <span className={style.postUserId}>@{post.writer.replace('@gmail.com','')}</span>
                            &nbsp;
                            ·
                            &nbsp;
                        </Link>
                        <span className={style.postDate}>{dayjs.utc(post.createdAt).local().fromNow(true)}</span>
                    </div>
                    
                    <div className={style.postContent}>
                        <h4>말씀하시는 하나님은...</h4>

                        <span>{post.title}</span>

                        <h4>오늘의 AMAD</h4>
                        <span>{post.myAmad}</span>
                        <div className={style.postImageSection}>
                            {/*<PostImages post={post}/>*/}
                        </div>
                    </div>
                    </PostArticle>
                    <ActionButtons whoLikesMyPost={post.whoLikesMyPost}likes={post.likes} commentsNum={post.commentsNum} postId={post.id}/>
                </div>
            </div>
        
    )
}