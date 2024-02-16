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

type Props = {
    noImage?: boolean,
    post: any

}
export default function Post({ noImage ,post }: Props) {
    const target = post


        return (
            <PostArticle post={target}>

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
                                <span className={style.postUserId}>@{target.writer}</span>
                                &nbsp;
                                ·
                                &nbsp;
                            </Link>
                            <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
                            <div className={style.postFixButton}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"
                                     viewBox="-2 -2 24 24" preserveAspectRatio="xMinYMin" className="jam jam-write">
                                    <path
                                        d="M5.72 14.456l1.761-.508 10.603-10.73a.456.456 0 0 0-.003-.64l-.635-.642a.443.443 0 0 0-.632-.003L6.239 12.635l-.52 1.82zM18.703.664l.635.643c.876.887.884 2.318.016 3.196L8.428 15.561l-3.764 1.084a.901.901 0 0 1-1.11-.623.915.915 0 0 1-.002-.506l1.095-3.84L15.544.647a2.215 2.215 0 0 1 3.159.016zM7.184 1.817c.496 0 .898.407.898.909a.903.903 0 0 1-.898.909H3.592c-.992 0-1.796.814-1.796 1.817v10.906c0 1.004.804 1.818 1.796 1.818h10.776c.992 0 1.797-.814 1.797-1.818v-3.635c0-.502.402-.909.898-.909s.898.407.898.91v3.634c0 2.008-1.609 3.636-3.593 3.636H3.592C1.608 19.994 0 18.366 0 16.358V5.452c0-2.007 1.608-3.635 3.592-3.635h3.592z"/>
                                </svg>
                            </div>
                        </div>

                        <div className={style.postContent}>
                            <h4>말씀하시는 하나님은...</h4>

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
                        <ActionButtons/>
                    </div>
                </div>
            </PostArticle>
        )

}