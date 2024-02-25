import style from "@/app/(afterLogin)/[username]/status/[id]/_component/commentForm.module.css";

type Props={
    comment: any
}

export default function Comment({comment}:Props) {

    return(
        <div className={style.postForm}>
            <div className={style.postUserSection}>
                <div className={style.postUserImage}>
                <img src={comment.statusImg} alt={comment.nickname}/>
                </div>
            </div>
                <div className={style.postInputSection}>
                    <strong>{comment.nickname}</strong>: {comment.mention}
                </div>
        </div>
    )

}