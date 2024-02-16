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

dayjs.locale('ko');
dayjs.extend(relativeTime)


export default function PostAbstract({ noImage, post }: any) {

    // if (Math.random() > 0.5 && !noImage) {
    //     post.imgs.push(
    //         {imageId: 1, link: faker.image.urlLoremFlickr()},
    //         {imageId: 2, link: faker.image.urlLoremFlickr()},
    //         {imageId: 3, link: faker.image.urlLoremFlickr()},
    //         {imageId: 4, link: faker.image.urlLoremFlickr()},
    //     )
    // }
    // console.log(post.imgs)

    return (
        <PostArticle post={post}>
            <div className={style.postWrapper}>
                <div className={style.postUserSection}>
                    <Link href={`/${post.writer}`} className={style.postUserImage}>
                        <img src={post.statusImg} alt={post.nickname}/>
                        <div className={style.postShade}/>
                    </Link>
                </div>
                <div className={style.postBody}>
                    <div className={style.postMeta}>
                        <Link href={`/${post.writer}`}>
                            <span className={style.postUserName}>{post.nickname}</span>
                            &nbsp;
                            <span className={style.postUserId}>@{post.writer}</span>
                            &nbsp;
                            ·
                            &nbsp;
                        </Link>
                        <span className={style.postDate}>{dayjs(post.createdAt).fromNow(true)}</span>
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
                    <ActionButtons/>
                </div>
            </div>
        </PostArticle>
    )
}