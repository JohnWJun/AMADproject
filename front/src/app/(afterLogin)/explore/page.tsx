import style from "./explore.module.css";
import SearchForm from "@/app/(afterLogin)/_component/SearchForm";
import AmadAbstract from "@/app/(afterLogin)/_component/AmadAbstract";
import Post from "@/app/(afterLogin)/_component/PostAbstract";

export default function Home() {
    return (
        <main className={style.main}>
            <div className={style.formZone}>
                <SearchForm />
            </div>
            <div className={style.explorePost}>
                <h3>친구들의 묵상을 찾아보세요.</h3>
            </div>
            <Post />
            <Post />
            <Post />
            <Post />
        </main>
    )
}