"use client";

import style from './composeAmad.module.css';
import {ChangeEventHandler, FormEventHandler, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {postPost} from "@/app/(afterLogin)/_lib/PostApi";
import {useRecoilValue} from "recoil";
import {Member} from "@/app/_component/MemberRecoilState"

export default function ComposeAmad() {

    type typeForContent = string;
    const memberInfo = useRecoilValue(Member);

    const Post = {
        bibleVerses: [{
            bible: 'ge',
            bibleChapter: 0,
            bibleVerseFrom: 0,
            bibleVerseTo: 0

        }],
        title: '',
        content_1: '',
        content_2: '',
        content_3: '',
        content_4: '',
        content_5: '',
        myAmad:'',
    }
    const bibles = [];
    const [book, setBook] = useState<typeForContent>(Post.bibleVerses[0].bible);
    const [chapter, setChapter] = useState<string>('');
    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');
    const [title, setTitle] = useState<typeForContent>(Post.title);

    const [content_1, setContent_1] = useState<typeForContent>(Post.content_1);
    const [content_2, setContent_2] = useState<typeForContent>(Post.content_2);
    const [content_3, setContent_3] = useState<typeForContent>(Post.content_3);
    const [content_4, setContent_4] = useState<typeForContent>(Post.content_4);
    const [content_5, setContent_5] = useState<typeForContent>(Post.content_5);
    const [amad, setAmad] = useState<typeForContent>(Post.myAmad);

    const imageRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const onSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        // Construct the requestBody object with the updated values
        const requestBody = {

                bibleVerses: [
                    {
                        bible: book,
                        bibleChapter: parseInt(chapter) || 0,
                        bibleVerseFrom: parseInt(from) || 0,
                        bibleVerseTo: parseInt(to) || 0
                    }
                ],
                title: title,
                content_1: content_1,
                content_2: content_2,
                content_3: content_3,
                content_4: content_4,
                content_5: content_5,
                myAmad: amad

        };

        const accessToken = localStorage.getItem("Authorization") || '';
        const refreshToken = localStorage.getItem("Refresh") || '';
        const email = memberInfo.email

        // Call the postPost function with the updated requestBody
        const {success,data, error} = await postPost({requestBody, accessToken, refreshToken, email});
        if (success) {
    
            router.replace(`/${data.nickname}/status/${data.id}/`);
            router.refresh();
        }
        if(!success && error === '409'){
            console.log("login failed");
            router.replace('/')
        }
    };
    const onClickClose = () => {
        router.back();
    }
    const onClickButton = () => {
        imageRef.current?.click();
    }

    const onSelectBook : ChangeEventHandler<HTMLSelectElement> =(e) => {
        setBook(e.target.value);
    }
    const onChangeChapter : ChangeEventHandler<HTMLInputElement> =(e) => {
        setChapter(e.target.value);
    }
    const onChangeFrom : ChangeEventHandler<HTMLInputElement> =(e) => {
        setFrom(e.target.value);
    }
    const onChangeTo : ChangeEventHandler<HTMLInputElement> =(e) => {
        setTo(e.target.value);
    }
    const onChangeAmad : ChangeEventHandler<HTMLTextAreaElement> =(e) => {
        setAmad(e.target.value);
    }
    const onChangeContent_1 : ChangeEventHandler<HTMLInputElement> =(e) => {
        setContent_1(e.target.value);
        setTitle(e.target.value);
    }

    const onChangeContent_2 : ChangeEventHandler<HTMLTextAreaElement> =(e) => {
        setContent_2(e.target.value);
    }

    const onChangeContent_3 : ChangeEventHandler<HTMLTextAreaElement> =(e) => {
        setContent_3(e.target.value);
    }

    const onChangeContent_4 : ChangeEventHandler<HTMLTextAreaElement> =(e) => {
        setContent_4(e.target.value);
    }

    const onChangeContent_5: ChangeEventHandler<HTMLTextAreaElement> =(e) => {
        setContent_5(e.target.value);
    }


    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
                <div className={style.innerModal}>
                <button className={style.closeButton} onClick={onClickClose}>
                    <svg width={24} viewBox="0 0 24 24" aria-hidden="true"
                         className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03">
                        <g>
                            <path
                                d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path>
                        </g>
                    </svg>
                </button>
                <form className={style.modalForm} onSubmit={onSubmit}>
                    <div className={style.modalBody}>
                        <div className={style.postUserSection}>
                            <div className={style.postUserImage}>
                                <img src={memberInfo.statusImg} alt={memberInfo.email}/>
                            </div>
                        </div>


                        <div className={style.inputSection}>
                            <div className={style.inputDiv}>
                                <h4>오늘의 묵상을 기록하세요.</h4>
                            </div>
                            <div className={style.inputDiv}>
                                <h5>오늘 나에게 주신 말씀</h5>
                            </div>
                            <span>
                                <div>
                                성경: <select name="book" value={book} onChange={onSelectBook} >

                                    <option value='ge'>ge (창세기)</option>
                                    <option value='exo'>exo (출애굽기)</option>
                                    <option value='lev'>lev (레위기)</option>
                                    <option value='num'>num (민수기)</option>
                                    <option value='deu'>deu (신명기)</option>
                                    <option value='josh'>josh (여호수아)</option>
                                    <option value='jdgs'>jdgs (사사기)</option>
                                    <option value='ruth'>ruth (룻기)</option>
                                    <option value='1sm'>1sm (사무엘상)</option>
                                    <option value='2sm'>2sm (사무엘하)</option>
                                    <option value='1ki'>1ki (열왕기상)</option>
                                    <option value='2ki'>2ki (열왕기하)</option>
                                    <option value='1chr'>1chr (역대상)</option>
                                    <option value='2chr'>2chr (역대하)</option>
                                    <option value='ezra'>ezra (에스라)</option>
                                    <option value='neh'>neh (느헤미야)</option>
                                    <option value='est'>est (에스더)</option>
                                    <option value='job'>job (욥기)</option>
                                    <option value='psa'>psa (시편)</option>
                                    <option value='prv'>prv (잠언)</option>
                                    <option value='eccl'>eccl (전도서)</option>
                                    <option value='ssol'>ssol (아가)</option>
                                    <option value='isa'>isa (이사야)</option>
                                    <option value='jer'>jer (예레미야)</option>
                                    <option value='lam'>lam (예레미야 애가)</option>
                                    <option value='eze'>eze (에스겔)</option>
                                    <option value='dan'>dan (다니엘)</option>
                                    <option value='hos'>hos (호세아)</option>
                                    <option value='joel'>joel (요엘)</option>
                                    <option value='amos'>amos (아모스)</option>
                                    <option value='obad'>obad (오바댜)</option>
                                    <option value='jonah'>jonah (요나)</option>
                                    <option value='mic'>mic (미가)</option>
                                    <option value='nahum'>nahum (나훔)</option>
                                    <option value='hab'>hab (하박국)</option>
                                    <option value='zep'>zep (스바냐)</option>
                                    <option value='hag'>hag (학개)</option>
                                    <option value='zep'>zep (스가랴)</option>
                                    <option value='mal'>mal (말라기)</option>
                                    <option value='mat'>mat (마태복음)</option>
                                    <option value='mark'>mark 마가복음)</option>
                                    <option value='luke'>luke (누가복음)</option>
                                    <option value='john'>john (요한복음)</option>
                                    <option value='acts'>acts (사도행전)</option>
                                    <option value='rom'>rom (로마서)</option>
                                    <option value='1cor'>1cor (고린도전서)</option>
                                    <option value='2cor'>2cor (고린도후서)</option>
                                    <option value='gal'>gal (갈라디아서)</option>
                                    <option value='eph'>eph (에베소서)</option>
                                    <option value='phi'>phi (빌립보서)</option>
                                    <option value='col'>col (골로새서)</option>
                                    <option value='1th'>1th (데살로니가전서)</option>
                                    <option value='2th'>2th (데살로니가후서)</option>
                                    <option value='1tim'>1tim (디모데전서)</option>
                                    <option value='2tim'>2tim (디모데후서)</option>
                                    <option value='titus'>titus (디도서)</option>
                                    <option value='phmn'>phmn (빌레몬서)</option>
                                    <option value='heb'>heb (히브리서)</option>
                                    <option value='jas'>jas (야고보서)</option>
                                    <option value='1pet'>1pet (베드로전서)</option>
                                    <option value='2pet'>2pet (베드로후서)</option>
                                    <option value='1jn'>1jn (요한1서)</option>
                                    <option value='2jn'>2jn (요한2서)</option>
                                    <option value='3jn'>3jn (요한3서)</option>
                                    <option value='jude'>jude (유다서)</option>
                                    <option value='rev'>rev (요한계시록)</option>

                                    </select>
                                    <input type="number" min="1" name={"chapter"} value={chapter} onChange={onChangeChapter} placeholder={'장'} />
                                    장
                                    <input type="number" min="1" name={"from"} value={from} onChange={onChangeFrom} placeholder={'절'} />
                                    절 ~
                                    <input type="number" min="1" name={"to"} value={to} onChange={onChangeTo} placeholder={'절'} />
                                    절
                                </div>
                                <div>

                                </div>
                            </span>
                            <div className={style.inputDiv}>
                                <div>
                                    1. 말씀하시는 하나님?
                                    <input className={style.input} placeholder="~는 하나님"
                                           value={content_1}
                                           onChange={onChangeContent_1}/>

                                </div>
                            </div>
                            <div className={style.inputDiv}>
                                <div>
                                    2. {content_1}이 이 말씀을 통해 하시고 싶은 말씀은?
                                    <textarea className={style.textArea} placeholder="오늘 나에게 이 말씀을 통해 하나님께서는 말씀하십니다."
                                              value={content_2}
                                              onChange={onChangeContent_2}/>
                                </div>
                            </div>
                            <div className={style.inputDiv}>
                                <div>
                                    3. {content_1}, <br/>이 말씀에 비추어 저는 어떤 삶을 살았습니까?
                                    <textarea className={style.textArea} placeholder="하나님과 나를 점검하고 깨닫게하시는 모습을 나눠주세요."
                                              value={content_3}
                                              onChange={onChangeContent_3}/>
                                </div>
                            </div>
                            <div className={style.inputDiv}>
                                <div>
                                    4. {content_1}, <br/>그럼에도 불구하고 주님은 저에게 어떻게 하셨습니까?
                                    <textarea className={style.textArea}
                                              placeholder="하나님께서 어떤 상황속에서 어떻게 함께하셨는지 여쭈어보세요."
                                              value={content_4}
                                              onChange={onChangeContent_4}/>
                                </div>
                            </div>

                            <div className={style.inputDiv}>
                                <div>
                                    5. {content_1}, <br/>오늘 저는 어떤 삶을 살기 원하십니까?
                                    <textarea className={style.textArea}
                                              placeholder="오늘 하나님께서 당신에게 원하시는 모습은 어떤 모습인가요?"
                                              value={content_5}
                                              onChange={onChangeContent_5}/>
                                </div>
                            </div>
                            <div className={style.inputDiv}>
                                <div>
                                    <h6>AMAD</h6>
                                    <textarea className={style.textArea}
                                              placeholder="하나님께서 주신 당신의 오늘의 미션은?"
                                              value={amad}
                                              onChange={onChangeAmad}/>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className={style.modalFooter}>
                        <div className={style.modalDivider}/>
                        <div className={style.footerButtons}>
                            <div className={style.footerButtonLeft}>
                                <input type="file" name="imageFiles" multiple hidden ref={imageRef}/>
                                <button className={style.uploadButton} type="button" onClick={onClickButton}>
                                    <svg width={24} viewBox="0 0 24 24" aria-hidden="true">
                                        <g>
                                            <path
                                                d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <button type={"submit"} className={style.actionButton} disabled={!book||!chapter||!from || !to || !content_1 || !content_2 || !content_3 || !content_4 || !content_5 || !amad}>게시하기</button>
                        </div>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}