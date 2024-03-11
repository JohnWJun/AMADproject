"use client";

import style from "@/app/(beforeLogin)/_component/tutorial.module.css";
import {useRouter} from "next/navigation";
import BackButton from "./BackButton";
import { useState } from "react";

export default function Tutorial() {
    const router = useRouter();
    const [page, setPage] = useState(1);

    const onClickClose =() => {

    }
    const onClickNext = () => {
        if(page >0){
        setPage((prevPage)=>prevPage+1);
        }
    }
    const onClickPrev = () => {
        if(page >0){
        setPage((prevPage)=>prevPage-1);
    }
    }
    return (
       <div className={style.modalBackground}>
        <div className={style.modal}>
            <div className={style.modalHeader}>
                <BackButton/>
            </div>
            <div className={style.modalBody}>
            {page ===1 &&(   
                <>
                <h3>👀 Step1.</h3>
                &emsp;
                <h3>Q1. 말씀하시는 하나님은?</h3>
                &emsp;
                <h5>오늘 동행하시는 하나님</h5>
                &emsp;
                <div className={style.descriptionBox}>
                주어진 본문을 읽고 가슴에 와 닿는 구절을 찾는다. <br/>
                가장 가슴에 와닿는 구절을 두고 <strong>"(&emsp;)라고 말씀하시는 하나님은 어떤 하나님 이십니까?" </strong>
                질문한다. <br/> 그 하나님이 느껴지는대로 기록하고 어떤 하나님과 동행할지 다시한번 묻고 결정한다.
                <br/>
                </div>
                <div className={style.exampleBox}>
                    <strong>Example</strong><br/>
                    골로새서 1:1~8 중<br/>
                    
                    <strong>7. 이와 같이 우리와 함께 종 된 사랑하는 에바브라에게 너희가 배웠나니 그는 너희를 위한 그리스도의 신실한 일꾼이요.</strong>
                    <br/>
                    <strong>말씀하시는 하나님:</strong> “주의 종을 통해 일하시는 하나님”
                </div>
                </>
                )}

            {page ===2 &&(   
                <>
                <h3>✍🏻 Step2.</h3>
                &emsp;
                <h3>Q2. 하시고싶으신 말씀은?</h3>
                &emsp;
                <div className={style.descriptionBox}>
                1번에서 결정한 말씀하시는 하나님을 부른다. "(&emsp;)하나님,이 말씀을 통해 저에게 하시고 싶으신 말씀이 있으십니까?"<br/>
                질문하고 기다린다. 대화를 하는 방식으로 묻고 응답을 듣고 기록한다. 하나님은 다양한 방법으로 우리에게 말씀하신다. <br/> 때로는 이미지로, 단어로, 문장으로...
                느낌같은 말씀에, 주시는 마음에 집중하자. 
                <br/>5가지 질문중 가장 중요한 부분이며 충분한 시간을 가지고 응답하심을 기다리자.<br/>(대화)
                </div>
                <div className={style.exampleBox}>
                    <strong>Example</strong><br/>
                    ...
                </div>
                </>
                )}

            {page ===3 &&(   
                <>
                <h3>💡 Step3.</h3>
                &emsp;
                <h3>Q3. 저의 삶은?</h3>
                &emsp;
                <div className={style.descriptionBox}>
                <strong>"(&emsp;)하나님, 이 말씀에 비추어 저는 어떤 삶을 살았습니까?" </strong>질문하고 다시 기다린다. <br/>하나님의 눈으로 자신의 문제를 보며 하나님이 주시는 찔림에 대한 무조건적인 인정이 선행되어야 한다.
                <br/>(회개)
                </div>
                <div className={style.exampleBox}>
                <strong>Example</strong><br/>
                    ...
                </div>
                </>
                )}
            {page ===4 &&(   
                <>
                <h3>💖 Step4.</h3>
                &emsp;
                <h3>Q4. 그럼에도 불구하고?</h3>
                &emsp;
                <div className={style.descriptionBox}>
                "(&emsp;)하나님, (3번 질문에 비추어) 그럼에도 불구하고 하나님은 저에게 어떻게 행하셨습니까?"
                현재 자신의 상태에서 주님께서 나에게 행하신 일을 부님꼐 묻고 듣고 감사를 표현한다. 
                <br/>(감사) 
                </div>
                <div className={style.exampleBox}>
                <strong>Example</strong><br/>
                    ...
                </div>
                </>
                )}

            {page ===5 &&(   
                <>
                <h3>✔️ Step5.</h3>
                &emsp;
                <h3>Q5. 오늘 저는?</h3>
                &emsp;
                <div className={style.descriptionBox}>
                "(    )하나님, 오늘 저가 어떤 삶을 살기를 원하십니까?"
                특별히 오늘 해야할 일과 바꾸어야 할 것을 주님꼐 묻고 기다린다. 오늘 하루 순종해야 할 미션(AMAD)을 받는다.
                <br/>(순종)
                </div>
                <div className={style.exampleBox}>
                <strong>Example</strong><br/>
                    골로새서 1:1~8 중
                    7절: 이와 같이 우리와 함께 종 된 사랑하는 에바브라에게 너희가 배웠나니 그는 너희를 위한 그리스도의 신실한 일꾼이요.
                    
                    말씀하시는 하나님: “주의 종을 통해 일하시는 하나님”
                </div>
                </>
                )}
            </div>
            <div className={style.modalFooter}>
            <div className={style.seeMoreButtonSection}>
            <button disabled={page===1} className={style.seeMoreButton} onClick={onClickPrev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24">
                <polyline fill="none" stroke={page !== 1 ? "#000000" : "#e3e3e3"}  strokeWidth="2" points="7 2 17 12 7 22" transform="matrix(-1 0 0 1 24 0)" />
            </svg>
            </button>
            <button disabled={page===5} className={style.seeMoreButton} onClick={onClickNext}>
            <svg xmlns="http://www.w3.org/2000/svg" fill={page !== 5 ? "#000000" : "#e3e3e3"} height="20px" width="20px" version="1.1" id="XMLID_287_" viewBox="0 0 24 24" >
            <g id="next"><g>
            <polygon points="6.8,23.7 5.4,22.3 15.7,12 5.4,1.7 6.8,0.3 18.5,12   "/></g></g>
            </svg>
            </button>
            </div>
                
            </div>
        </div>
       </div>
    )
}