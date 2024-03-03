import React, {ReactNode} from "react";
import style from '@/app/(afterLogin)/layout.module.css';
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";
import AmadSection from "@/app/(afterLogin)/_component/AmadSection";
import Link from "next/link";
import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
import RightSearchZone from "@/app/(afterLogin)/_component/RightSearchZone";
import MainLogo from "@/app/_component/MainLogo";
import PostButton from "@/app/(afterLogin)/_component/PostButton";

type Props = { children: ReactNode, modal: ReactNode };
export default async function AfterLoginLayout({children, modal}: Props) {

    return (
        <div className={style.container}>
            <header className={style.leftSectionWrapper}>
                <section className={style.leftSection}>
                    <div className={style.leftSectionFixed}>
                        <Link className={style.logo} href="/home">
                            <div className={style.logoPill}>
                                <MainLogo width={'50px'} height={'45px'}/>
                            </div>
                        </Link>
                        <nav>
                            <ul>
                                <NavMenu/>
                            </ul>

                            <Link href="/compose/amad" className={style.postButton}>
                                <span>묵상하기</span>
                                <PostButton/>
                            </Link>

                        </nav>
                        <LogoutButton/>
                    </div>
                </section>
            </header>
            <div className={style.rightSectionWrapper}>
                <div className={style.rightSectionInner}>
                    <main className={style.main}>{children}</main>

                    <section className={style.rightSection}>
                        <RightSearchZone/>
                        <AmadSection/>
                        <div className={style.followRecommend}>
                            <h3>팔로우 추천</h3>
                            <FollowRecommend/>
                            {/* <FollowRecommend/>
                            <FollowRecommend/> */}
                        </div>
                    </section>
                    <div className={style.mobilePostButtonContainer}>
                    <Link href="/compose/amad" className={style.mobilePostButton}>
                        <span>묵상하기</span>
                        <PostButton/>
                    </Link>
                    </div>
                    <div className={style.mobileMenu}>
                        <nav>
                            <ul>
                                <NavMenu/>
                            </ul>
                        </nav>

                    </div>
                </div>
            </div>
            {modal}

        </div>
    )
}

