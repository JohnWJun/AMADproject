"use client";

import {ReactNode} from "react";
import style from './postArticle.module.css';
import {useRouter} from "next/navigation";

type Props = {
    children: ReactNode,
    post: any
}

export default function PostArticle({ children, post}: Props) {
    const router = useRouter();
    const onClick = () => {
        router.push(`/${post.nickname}/status/${post.id}`);
    }

    return (
        <article onClickCapture={onClick} className={style.post}>
            {children}
        </article>
    );


}