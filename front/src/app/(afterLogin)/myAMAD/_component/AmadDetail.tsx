

import style from "./amadDetail.module.css"
export default function AmadDetail(){

    const target = {
        amadId: 1,
        User: {
            id: 'tbvjdngus@gmail.com',
            nickname: 'John Jun',
            image: '/AMAD.png',
        },
        myAmad: '10명에게 안부를 묻고 사랑을 나누기',
        createdAt: new Date(),
        isComplete: false
    }
    return (
        <div className={style.amadContent}>
            <div>{target.myAmad}</div>
            <div>달성여부: {target.isComplete? "완료":"미완료"}</div>
        </div>
    )
}