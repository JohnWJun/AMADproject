"use client";
import {useRouter} from "next/navigation";
import style from './aboutAmad.module.css';
import Link from "next/link";
import GoogleLogo from "@/app/_component/GoogleLogo"


export default function Login(){
    const router =useRouter();
    
    return (
        <main className={style.main}>
            <div className={style.titleSection}>
                <h2>About Us</h2>
            </div>
            <div className={style.bodySection}>
                    <div className={style.aboutUsSection}>
                        <div className={style.aboutUsBody}>
                            <h4>⛪ AMAD 묵상 공동체 플렛폼</h4>
                            <div>
                                <h5>🙏🏻 A Mission A Day</h5>
                                    <div className={style.aboutUsBodyHighlightedSection}>
                                    <strong>"A Mission A Day 의 머릿글자를 딴 AMAD는 하루에 한가지 주님께 받은 말씀에 순종함으로써 <br/>묵상과 하나님의 음성듣기, 순종훈련을 함께 할 수 있는 묵상 공동체 플렛폼입니다."</strong>
                                    </div>
                                        <div className={style.aboutUsBodyPart}>
                                        히브리어 '아마드-עָמַד'는 <strong>“하나님 앞에서 일어서다”</strong>의 의미가 있습니다. <strong>“뜻을 분명히 하다, 모든 것을 멈추고 앞만 바라보다, 말씀 앞에 돌아오다”</strong>의 의미를 가지고 있습니다. 지금까지 자신의 습관과 방법대로 하던 모든 것을 멈추고 <strong>하나님의 말씀앞에 돌아와 다시 서는 것</strong>을 의미합니다.
                                        기존의 묵상(QT)은 자신의 노력으로 성경을 관찰하고 분석하여 자신의 삶을 반성하고 적용점을 찾아서 고치려고 애썼습니다. 그러나 <strong>실체화된 묵상</strong>은 <strong>나로부터가 아닌 하나님으로 부터 오는 말씀</strong>을 받아 순종함으로 하루를 살아감으로써 <strong>나에게서 주님의 모습이 나타나는 것</strong> 입니다. 묵상은 하나님께서 오늘 나를 통해 이루실 일을 부여 받고, <strong>그 일을 주님과 함께 이루어 가는 과정입니다.</strong>
                                        </div>
                                            <div className={style.aboutUsBodyPart}>
                                                5가지 질문중 마지막 질문인 <strong>“주님 저는 오늘 어떤 삶을 살기 원하십니까?”</strong> 라는 물음에 주님과 함께 답을 찾고 하루동안 주님과 함께 이루어 가야 합니다. 우리는 이 일이 필요하다는 것을 알지만 <strong>혼자서는 쉽지 않습니다.</strong> 그래서 하루에 단 하나의 미션에 순종하는 훈련을 함께 할 수 있도록 돕는 일이 필요합니다. 
                                                방법은 간단합니다. 매일 <strong>1. 묵상하고, 2. 순종하고, 3. 나누는 일</strong>을 통해 내가 경험한 하나님을 다른 사람에게 자랑하며 다른 사람이 경험한 하나님을 공감하는 것입니다.
                                            </div>
                                        <h5>🌎 Our Vision</h5>
                                        <div className={style.aboutUsBodyHighlightedSection}>
                                        <strong>“우리의 비전은 누구나 하나님의 음성을 듣고 그 음성에 순종하여 하나님의 다스림 아래 사는 것이며, 그리스도의 날까지 이 일을 계속 해나갈 수 있는 안정된 방법을 주님과 함께 찾아가고 있습니다.”</strong>
                                        </div>
                            </div>
                        </div>
                    </div>
                    <div className={style.tutorialSection}>
                        
                            <div className={style.buttons}>
                                <Link href={'/tutorial'} className={style.tutorialLink}>
                                    AMAD 묵상 배우기
                                </Link>
                                <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/google`}
                                className={style.tutorialLink}>
                                    <GoogleLogo width={'20px'} height={'20px'}/>
                                    &nbsp;
                                    <div className={style.buttonText}>Login with Google</div>
                                    </Link>
                            </div>
                    
                    </div>
            </div>    
        </main>
        
    );
}