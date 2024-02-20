import PostDetails from "@/app/(afterLogin)/_component/PostDetails";
import style from "./myAmad.module.css"
import AmadDetail from "./_component/AmadDetail";

export default function Home() {
    return (
        <main>
            <div className={style.container}>
                <h3>오늘 나의 묵상</h3>
            </div>
            {/*<PostDetails post={} email={}/>*/}
            <div className={style.container}>
                <h3>오늘 나의 AMAD</h3>
            </div>
            <AmadDetail/>
        </main>
    );
}