"use client";

import style from "@/app/(beforeLogin)/_component/tutorial.module.css";
import {useRouter} from "next/navigation";
import BackButton from "./BackButton";
import { useState } from "react";
import Link from "next/link";
import MainLogo from "@/app/_component/MainLogo";
import Image from "next/image";
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
                <MainLogo width={"50px"} height={"50px"}/>
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
                &emsp;
                <div className={style.exampleBox}>   
                    <strong>Example</strong><br/>
                    &emsp;
                    
                    <div className={style.textBox}>
                    <h4>오늘 내게 주신 말씀</h4>
                    <div>mk 16.12 그 후에 그들 중 두 사람이 걸어서 시골로 갈 때에 예수께서 다른 모양으로 그들에게 나타나시니</div>
                    &emsp;
                    <div className={style.dialogBox}>
                    <h4>Q:"말씀하시는 하나님은..."</h4>
                    A:“다른 모양으로 나타나시는 하나님”
                    </div>
                    </div>
                    <div className={style.exampleFooter}>
                    <img src="./John.png"/>
                    </div>
                </div>
                
                </>
                )}

            {page ===2 &&(   
                <>
                <h3>✍🏻 Step2.</h3>
                &emsp;
                <h3>Q2. 하시고싶으신 말씀은?</h3>
                &emsp;
                <h5>대화</h5>
                &emsp;
                <div className={style.descriptionBox}>
                1번에서 결정한 말씀하시는 하나님을 부른다. <strong>"(&emsp;)하나님,이 말씀을 통해 저에게 하시고 싶으신 말씀이 있으십니까?"</strong><br/>
                질문하고 기다린다. <strong>대화를 하는 방식으로 묻고 응답을 듣고 기록한다.</strong> 하나님은 다양한 방법으로 우리에게 말씀하신다. <br/> 때로는 이미지로, 단어로, 문장으로...
                느낌같은 말씀에, 주시는 마음에 집중하자. 
                5가지 질문중 가장 중요한 부분이며 충분한 시간을 가지고 응답하심을 기다리자.<br/>
                </div>
                &emsp;
                <div className={style.exampleBox}>
                <strong>Example</strong><br/>
                    &emsp;
                    <div className={style.textBox}>
                    <div className={style.dialogBox}>
                    <h4>Q:“다른 모양으로 나타나시는 하나님”, 이 말씀을 통해 하나님 저에게 하시고 싶으신 말씀이 있으십니까?</h4>
                    A:너는 어떤 나를 보느냐? 너는 오늘 나를 보았느냐? 오는 너에게 보이는 나의 모습은 강한자냐? 연약한자냐?
                    나는 네게 늘 다른 모습으로 나타난다. 때로는 연약하여 돌보아 줄 자로, 때로는 강하여 네가 따라 순종할 자로, 때로는 네 뒤에서 보이지 않게 섬기고 있다.  그 모든 모습의 나를 볼 수 있느냐?
                    </div>
                    </div>
                    <div className={style.exampleFooter}>
                    <img src="./John.png"/>
                    </div>
                </div>
                </>
                )}

            {page ===3 &&(   
                <>
                <h3>💡 Step3.</h3>
                &emsp;
                <h3>Q3. 저의 삶은?</h3>
                &emsp;
                <h5>회개</h5>
                &emsp;
                <div className={style.descriptionBox}>
                <strong>"(&emsp;)하나님, 이 말씀에 비추어 저는 어떤 삶을 살았습니까?" </strong>질문하고 다시 기다린다. <br/>하나님의 눈으로 자신의 문제를 보며 하나님이 주시는 찔림에 대한 무조건적인 인정이 선행되어야 한다.
                </div>
                &emsp;
                <div className={style.exampleBox}>
                <strong>Example</strong><br/>
                    &emsp;
                    <div className={style.textBox}>
                    <div className={style.dialogBox}>
                    <h4>Q:“다른 모양으로 나타나시는 하나님”, 이 말씀에 비추어 저는 어떤 삶을 살았습니까?</h4>
                    A:정형화된 나의모습, 교회안에서의 모습, 구원자, 인도자, 치료자, 너를 돕는 자로 나를 이해하고 있다. 그러나 나는 네가 인식하지 못해도 너의 주위에 항상 있다. 나의 생명을 주어 살게한 모든 자들에게 나는 살아 있다. 그들의 삶 속에서 나는 살아있으며 그들을 이끌고 있다. 너는 그 모습을 볼 수 있느냐?  네 눈은 볼 수 있는가?
                    </div>
                    </div>
                    <div className={style.exampleFooter}>
                    <img src="./John.png"/>
                    </div>
                </div>
                </>
                )}
            {page ===4 &&(   
                <>
                <h3>💖 Step4.</h3>
                &emsp;
                <h3>Q4. 그럼에도 불구하고?</h3>
                &emsp;
                <h5>감사</h5>
                &emsp;
                <div className={style.descriptionBox}>
                <strong>"(&emsp;)하나님, (3번 질문에 비추어) 그럼에도 불구하고 하나님은 저에게 어떻게 행하셨습니까?"</strong><br/>
                현재 자신의 상태에서 주님께서 나에게 행하신 일을 주님께 묻고 듣고 감사를 표현한다. 
                
                
                </div>
                &emsp;
                <div className={style.exampleBox}>
                <strong>Example</strong><br/>
                    &emsp;
                    <div className={style.textBox}>
                    <div className={style.dialogBox}>
                    <h4>Q:“다른 모양으로 나타나시는 하나님”, 그럼에도 불구하고 하나님은 저에게 어떻게 행하셨습니까?</h4>
                    A:너를 인도하여 다른사람을 섬기고, 다른 사람을 인도하여 너를 섬기고 그리하여 모든 그리스도인들이 하나님을 알게하고 하나님의 공급을 누릴 수 있게 한다.
                    </div>
                    </div>
                    <div className={style.exampleFooter}>
                    <img src="./John.png"/>
                    </div>
                </div>
                </>
                )}

            {page ===5 &&(   
                <>
                <h3>✔️ Step5.</h3>
                &emsp;
                <h3>Q5. 오늘 저는?</h3>
                &emsp;
                <h5>AMAD</h5>
                &emsp;
                <div className={style.descriptionBox}>
                <strong>"(    )하나님, 오늘 제가 어떤 삶을 살기를 원하십니까?"</strong>
                특별히 오늘 해야할 일과 바꾸어야 할 것을 주님께 묻고 기다린다. 오늘 하루 순종해야 할 미션(AMAD)을 받는다.
                </div>
                <div className={style.exampleBox}>
                <strong>Example</strong><br/>
                    &emsp;
                    <div className={style.textBox}>
                    <div className={style.dialogBox}>
                    <h4>Q:“다른 모양으로 나타나시는 하나님”, 오늘 저는 어떤 삶을 살기 원하십니까?</h4>
                    A:모든 사람을 섬기기를 나를 섬기는 것처럼 하라. 모든 사람을 섬기기를 주께 하듯 하라 하신 말씀은 그냥 섬기는 것이 아니라 그 안에 내가 살아 있기 때문이다. 내가 그들을 통해 역사하기 때문이다. 
                    너를 사랑한다. 너도 그를 사랑하라. 특히 낮은 모습으로 온 그를 사랑하라.
                    <h4>오늘의 AMAD</h4>
                        OOO 성도에게 낮은 모습으로 온 예수님을 발견하고 
                        주께 하듯 섬기기
                    </div>
                    </div>
                    <div className={style.exampleFooter}>
                    <img src="./John.png"/>
                    </div>
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