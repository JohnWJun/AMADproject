import BackButton from "@/app/(afterLogin)/_component/BackButton";
import PostDetails from "@/app/(afterLogin)/_component/PostDetails";
import style from './singlePost.module.css';
import Post from "@/app/(afterLogin)/_component/PostAbstract";
import CommentForm from "@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm";

export default function SinglePost() {
    return (
        <div className={style.main}>
            <div className={style.header}>
                <BackButton/>
                <h3 className={style.headerTitle}>게시하기</h3>
            </div>
            <PostDetails />
            <CommentForm />
            <div>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )
}