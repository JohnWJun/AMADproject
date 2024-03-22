import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import AmadAbstract from "@/app/(afterLogin)/_component/AmadAbstract";
import PostAbstract from "@/app/(afterLogin)/_component/PostAbstract";
import Link from "next/link";
import YoutubeVideo from "../_component/YouTubeVideo";

export default function Home() {
    return (
        <main className={style.main}>
            <div className={style.formZone}>
                <SearchForm />
            </div>
            <div className={style.explorePost}>
                <div className={style.recommendPostBox}>
                <h3>친구들의 묵상을 찾아보세요.</h3>
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
                <h3>생명의 삶: 오늘의 말씀</h3>
                    <Link href={"https://www.duranno.com/qt/view/bible.asp?qtDate=#"}>        
                    
                    </Link>
            
                </div>
                </div>
            </div>
            {/*<PostAbstract />*/}
            {/*<PostAbstract />*/}
            {/*<PostAbstract />*/}
            {/*<PostAbstract />*/}
        </main>
    )
}