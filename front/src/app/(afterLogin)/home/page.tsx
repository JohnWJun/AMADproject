"use client";
import style from './home.module.css';
import TabProvider from "@/app/(afterLogin)/home/_component/TabProvider";
import Tab from "@/app/(afterLogin)/home/_component/Tab";
import PostForm from "@/app/(afterLogin)/home/_component/PostForm";
import Post from "@/app/(afterLogin)/_component/PostAbstract";
// import GetPost from "@/app/(afterLogin)/home/_lib/GetPost";
import { useEffect} from "react";
import {tr} from "@faker-js/faker";
import {getCurrentUserInfo} from "@/app/(afterLogin)/_lib/MemberApi";
import { Member} from "@/app/_component/MemberRecoilState";
import {useRecoilState, useRecoilValue} from "recoil";
import {router} from "next/client";
import {useRouter} from "next/navigation";
// import Loading from "@/app/(afterLogin)/home/loading";
// import TabDeciderSuspense from "@/app/(afterLogin)/home/_component/TabDeciderSuspense";

export default function Home() {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem("Authorization");
        const refreshToken = localStorage.getItem("Refresh");
        // Use accessToken and refreshToken here

        const member = useRecoilValue(Member);
        const [memberInfo, setMemberInfo] = useRecoilState(Member);

        if (accessToken === '') {
            alert('로그인 후 접속이 가능합니다.')
            router.replace('/');
            router.refresh();
        }
        useEffect(() => {
            const fetchUserData = async () => {
                const {success} = await getCurrentUserInfo({
                    accessToken,
                    refreshToken,
                    setMemberInfo
                });
                // Process the user data if needed
            };

            // Fetch user data only if member email is empty
            if (member.email === '') {
                fetchUserData();
            }
        }, [member]);
    }

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