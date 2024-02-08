"use client";

import style from './composeAmad.module.css';
import {ChangeEventHandler, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {string} from "prop-types";
import {type} from "node:os";
export default function ComposeAmad() {
    type typeForTitle = string;
    type typeForContent = string;

    const bible = {
        book: '',
        chapter:'',
        from:'',
        to:''
    };
    const bibles = [];
    const [book, setBook] = useState<typeForContent>(bible.book);
    const [chapter, setChapter] = useState<typeForContent>(bible.chapter);
    const [from, setFrom] = useState<typeForContent>(bible.from);
    const [to, setTo] = useState<typeForContent>(bible.to);
    const [title, setTitle] = useState<typeForContent>('');

    const [content_1, setContent_1] = useState<typeForContent>('');
    const [content_2, setContent_2] = useState<typeForContent>('');
    const [content_3, setContent_3] = useState<typeForContent>('');
    const [content_4, setContent_4] = useState<typeForContent>('');
    const [content_5, setContent_5] = useState<typeForContent>('');
    const [amad, setAmad] = useState<typeForContent>('');

    const imageRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const onSubmit = () => {};
    const onClickClose = () => {
        router.back();
    }
    const onClickButton = () => {
        imageRef.current?.click();
    }

    const onSelectBook : ChangeEventHandler<HTMLSelectElement> =(e) => {
        setBook(e.target.value);
    }
    const onSelectChapter : ChangeEventHandler<HTMLSelectElement> =(e) => {
        setChapter(e.target.value);
    }
    const onSelectFrom : ChangeEventHandler<HTMLSelectElement> =(e) => {
        setFrom(e.target.value);
    }
    const onSelectTo : ChangeEventHandler<HTMLSelectElement> =(e) => {
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
    const me = {
        id: 'zerohch0',
        image: '/AMAD.png'
    };

    return (
        <div className={style.modalBackground}>
            <div className={style.modal}>
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
                                <img src={me.image} alt={me.id}/>
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
                                성경: <select name={"book"} onSelect={onSelectBook}>
                                        <option value={'ge'} >창세기</option>
                                    </select>
                                </div>
                                <div>
                                    chapter:
                                    <select name={"from"} onSelect={onSelectFrom}>
                                        <option value={'1'}>1장</option>
                                    </select>
                                    from:
                                    <select name={"from"} onSelect={onSelectFrom}>
                                        <option value={'1'}>1절</option>
                                    </select>
                                    to:
                                    <select name={"to"} onSelect={onSelectTo}>
                                        <option value={'1'}>1절</option>
                                    </select>
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
                            <button className={style.actionButton} disabled={!content_1}>게시하기</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}