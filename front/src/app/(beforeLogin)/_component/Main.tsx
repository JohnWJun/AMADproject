import styles from "@/app/(beforeLogin)/_component/main.module.css";
import Image from "next/image";
import amadLogo from "../../../../public/AMAD.png";
import Link from "next/link";
import MainLogo from "@/app/_component/MainLogo";
import GoogleLogo from "@/app/_component/GoogleLogo";

export default function Main() {
    return (
        <>
            <div className={styles.left}>
                <MainLogo width={"400px"} height={"350px"}/>
            </div>

            <div className={styles.right}>

                <h1>AMAD</h1>
                <h2>A Mission A Day<br/>
                    Your Daily Log with God</h2>

                {/*<h2>You can sign up now</h2>*/}
                {/*<Link href='i/flow/signup' className={styles.signup}>sign up</Link>*/}
                {/*<h3>Already signed up?</h3>*/}
                {/*<Link href='/login' className={styles.login}>log in</Link>*/}

                <Link href={`${process.env.NEXT_PUBLIC_SERVER_URL}/oauth2/authorization/google`}
                      className={styles.login}>
                    <GoogleLogo width={'20px'} height={'20px'}/>
                    Login with Google</Link>
            </div>
        </>
    )
}