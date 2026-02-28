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

                    <Link href='/aboutAmad' className={styles.login}>How to use AMAD</Link>

                    <Link href="/api/oauth2/authorization/google"
                      className={styles.login}>
                    <GoogleLogo width={'20px'} height={'20px'}/>
                    Login with Google</Link>

                    <p style={{ fontSize: '0.78rem', color: '#9ca3af', margin: '8px 0 0', textAlign: 'center', width: '300px' }}>
                        로그인 시{' '}
                        <a href="/terms" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'underline' }}>이용약관</a>
                        {' '}및{' '}
                        <a href="/privacy" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'underline' }}>개인정보처리방침</a>
                        에 동의하는 것으로 간주됩니다.
                    </p>
            </div>
        </>
    )
}