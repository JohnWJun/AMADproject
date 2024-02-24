import style from "./amadDetail.module.css"

type Props={
    myAmad: string,
    isComplete: boolean
}
export default function AmadDetail({myAmad, isComplete}: Props){

    return (
        <div className={style.amadContent}>

            <div>{myAmad}</div>
            <div>달성여부: {isComplete? "완료":"미완료"}</div>

        </div>
    )
}