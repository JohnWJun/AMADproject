import Link from "next/link";
import style from './amadAbstract.module.css';
export default function AmadAbstract() {
    return (
        <Link href={`/myAMAD`} className={style.container}>

            <div className={style.title}>3번 사랑고백하기</div>
            <div className={style.desc}>미션완료</div>
        </Link>
    )
}