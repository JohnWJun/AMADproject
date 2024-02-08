import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/PostAbstract";

export default function Home() {




    return (

            <main className={style.main}>
                <TabProvider>
                    <Tab/>
                    {/*<PostForm />*/}
                    <div className={style.postContainer}>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                    </div>

                </TabProvider>
            </main>
    )
}