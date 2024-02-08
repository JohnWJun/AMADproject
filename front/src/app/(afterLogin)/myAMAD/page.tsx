import Post from "@/app/(afterLogin)/_component/PostDetails";
import styles from "./myAmad.module.css"
import AmadDetail from "./_component/AmadDetail";

export default function Home() {
    return (
        <main>
            <div className={styles.container}>
                <h3>오늘 나의 묵상</h3>
            </div>
            <Post/>
            <div className={styles.container}>
                <h3>오늘 나의 AMAD</h3>
            </div>
            <AmadDetail/>
        </main>
    );
}