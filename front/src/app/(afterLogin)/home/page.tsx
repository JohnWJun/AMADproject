import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/PostAbstract";
// import GetPost from "@/app/(afterLogin)/home/_lib/GetPost";
import {Suspense } from "react";
import {tr} from "@faker-js/faker";
// import Loading from "@/app/(afterLogin)/home/loading";
// import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";
export default function Home() {



    return (

            <main className={style.main}>
                <TabProvider>
                    <Tab/>
                    {/*<PostForm />*/}
                    <div className={style.postContainer}>
                        {/*<Suspense fallback={<Loading />}>*/}
                        {/*    <TabDeciderSuspense />*/}
                        {/*</Suspense>*/}

                    </div>

                </TabProvider>
            </main>
    )
}