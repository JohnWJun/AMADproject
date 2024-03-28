"use client"
import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import AmadAbstract from "@/app/(afterLogin)/_component/AmadAbstract";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import Link from "next/link";
import YoutubeVideo from "../_component/YouTubeVideo";
import {ChangeEventHandler, FormEventHandler, useRef, useState} from "react";
import {getBible} from './_lib/bibleApi';
import { useRouter} from "next/navigation";

interface Bible {
    html: string
}
export default function Explore() {

    const [bible, setBible] = useState('ge');
    const [chapter, setChapter] = useState('');
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [bibleHtml, setBibleHtml] = useState<Bible>(); 
    const router = useRouter();
    const accessToken = localStorage.getItem("Authorization") || '';
    const refreshToken = localStorage.getItem("Refresh") || '';

    

    const onSelectBook : ChangeEventHandler<HTMLSelectElement> =(e) => {
        setBible(e.target.value);
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
    const onSubmit: FormEventHandler = async (e) => {
        e.preventDefault();
        const {success, data, error} = await getBible({accessToken,refreshToken, bible,chapter,from, to});
        
        if(success){
            setBibleHtml(data);
        }
        if(!success && error === '409'){
            console.log("login failed");
            router.replace('/');
        }
    
    }
    return (
        <main className={style.main}>
            <div className={style.formZone}>
                <SearchForm />
            </div>
            <div className={style.explorePost}>
                <div className={style.recommendPostBox}>
                <h3>친구들의 묵상을 찾아보세요.</h3>
                <h4>인기 AMAD</h4>
                </div>
            
            <div>
                <div className={style.tdyMusic}>
                    <h3>오늘의 CCM</h3>
                    &emsp;
                    <div className={style.videoBox}>
                    <YoutubeVideo videoId="xW5gim_oTjo"/>
                    </div>
                </div>
                <div>
                <h3>말씀 검색</h3>
                <form className={style.bibleSubmitForm} onSubmit={onSubmit}>
                <span>
                                <div>
                                성경: <select name="book" value={bible} onChange={onSelectBook} >

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
                                    <input name={"chapter"} value={chapter} onChange={onChangeChapter} placeholder={'1'}>
                                    </input> 장
                                    <input name={"from"} value={from} onChange={onChangeFrom} placeholder={'1'}>
                                    </input> 절 ~
                                    <input name={"to"} value={to} onChange={onChangeTo} placeholder={'1'}>
                                    </input> 절
                                </div>
                                <div>

                                </div>
                            </span>
                            <button type={"submit"} disabled={!bible||!chapter||!from || !to}>
                            <svg width={26} viewBox="0 0 24 24" aria-hidden="true"
                                     className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-cnnz9e">
                                    <g>
                                        <path
                                            d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                                    </g>
                                </svg>
                            </button>
                </form>
                <div className={style.bibleContentBox}>
                {bibleHtml && (
                    <div>
                        {bible} {chapter}장 {from}절 - {to}절
                        {bibleHtml.html.split(/(\d+:\d+)/).map((part, index) => (
                        <span key={index}>
                        {index % 2 === 0 ? part.trim() : <><br /><br />{part}</>} {/* Add line break after each verse number */}
                        </span>
                    ))}
                    </div>
                )}
                </div>

            
                </div>
                </div>
            </div>
        </main>
    )
}