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
    noImage?: boolean
}
export default function Post({ noImage }: Props) {
    const target = {
        postId: 1,
        User: {
            id: 'tbvjdngus@gmail.com',
            nickname: 'John Jun',
            image: '/AMAD.png',
        },
        content_1: '사랑의 하나님',
        content_2: '서로 사랑하라',
        content_3: '내 마음대로 판단하고 정죄하였습니다.',
        content_4: '그래도 하나님은 나를 사랑하셨어요',
        content_5: '사랑을 전하는 하루 되어라',
        myAmad: '10명에게 안부를 묻고 사랑을 나누기',
        createdAt: new Date(),
        Images: [] as any[],
    }
    if (Math.random() > 0.5 && !noImage) {
        target.Images.push(
            {imageId: 1, link: faker.image.urlLoremFlickr()},
            {imageId: 2, link: faker.image.urlLoremFlickr()},
            {imageId: 3, link: faker.image.urlLoremFlickr()},
            {imageId: 4, link: faker.image.urlLoremFlickr()},
        )
    }
    console.log(target.Images)

    return (
        <PostArticle post={target}>
            <div className={style.postWrapper}>
                <div className={style.postUserSection}>
                    <Link href={`/${target.User.id}`} className={style.postUserImage}>
                        <img src={target.User.image} alt={target.User.nickname}/>
                        <div className={style.postShade}/>
                    </Link>
                </div>
                <div className={style.postBody}>
                    <div className={style.postMeta}>
                        <Link href={`/${target.User.id}`}>
                            <span className={style.postUserName}>{target.User.nickname}</span>
                            &nbsp;
                            <span className={style.postUserId}>@{target.User.id}</span>
                            &nbsp;
                            ·
                            &nbsp;
                        </Link>
                        <span className={style.postDate}>{dayjs(target.createdAt).fromNow(true)}</span>
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