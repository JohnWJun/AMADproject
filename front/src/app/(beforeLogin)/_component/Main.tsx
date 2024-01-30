import styles from "@/app/(beforeLogin)/_component/main.module.css";
import Image from "next/image";
import amadLogo from "../../../../public/AMAD.png";
import Link from "next/link";

export default function Main() {
    return (
        <>
            <div className={styles.left}>
                <Image src={amadLogo} alt={"logo"}/>
            </div>

            <div className={styles.right}>
                <h1>Make Your Daily Log <br/> with God</h1>
                <h2>You can sign up now</h2>
                <Link href='i/flow/signup' className={styles.signup}>sign up</Link>
                <h3>Already signed up?</h3>
                <Link href='/login' className={styles.login}>log in</Link>
            </div>
        </>
    );
}