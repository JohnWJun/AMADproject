import React, {ReactNode} from "react";
import Image from "next/image";
import style from '@/app/(afterLogin)/layout.module.css';
import FollowRecommend from "@/app/(afterLogin)/_component/FollowRecommend";
import AmadSection from "@/app/(afterLogin)/_component/AmadSection";
import Link from "next/link";
import LogoutButton from "@/app/(afterLogin)/_component/LogoutButton";
import NavMenu from "@/app/(afterLogin)/_component/NavMenu";
import amadLogo from "../../../public/AMAD_New.png"
import RightSearchZone from "@/app/(afterLogin)/_component/RightSearchZone";

type Props = { children: ReactNode, modal: ReactNode };
export default async function AfterLoginLayout({children, modal}: Props) {

    return (
        <div className={style.container}>
            <header className={style.leftSectionWrapper}>
                <section className={style.leftSection}>
                    <div className={style.leftSectionFixed}>
                        <Link className={style.logo} href="/home">
                            <div className={style.logoPill}>
                                <Image src={amadLogo} alt={"logo"} width={40} height={40} />
                            </div>
                        </Link>
                        <nav>
                            <ul>
                                <NavMenu />
                            </ul>
                            <Link href="/compose/amad" className={style.postButton}>게시하기</Link>
                        </nav>
                        <LogoutButton />
                    </div>
                </section>
            </header>
            <div className={style.rightSectionWrapper}>
                <div className={style.rightSectionInner}>
                    <main className={style.main}>{children}</main>
                    <section className={style.rightSection}>
                        <RightSearchZone/>
                        <AmadSection />
                        <div className={style.followRecommend}>
                            <h3>팔로우 추천</h3>
                            <FollowRecommend />
                            <FollowRecommend />
                            <FollowRecommend />
                        </div>
                    </section>
                </div>
            </div>
            {modal}
        </div>
    )
}

