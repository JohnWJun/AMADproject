import Link from "next/link";
import style from './amadAbstract.module.css';
import { type } from "os";

type Props ={
    myAmad: {
        id: bigint;
        createdAt: string;
        modifiedAt: string;
        complete: boolean;
        mission: string;
    }
}
export default function AmadAbstract({myAmad}: Props) {
    return (
        <Link href={`/myAMAD`} className={style.container}>

            <div className={style.title}>{myAmad.mission}</div>
            {myAmad.complete ? <div className={style.desc}>미션완료</div>:
            <div className={style.desc}>미션수행중</div>}
        </Link>
    )
}