import Image from "next/image";
import styles from "../page.module.css";
import Link from "next/link";
import amadLogo from "../../../public/AMAD.png"

export default function Home() {
  return (
      <>
      <div className={styles.left}>
        <Image src={amadLogo} alt={"logo"}/>
      </div>

      <div className={styles.right}>
      <h1>Make Your Daily Log <br/> with God</h1>
      <h2>You can sign up now</h2>
        <Link href='i/flow/signup' className={styles.signup}>sign up</Link>
        <h3>Already sign up?</h3>
        <Link href='/login' className={styles.login}>log in</Link>
      </div>
        </>
  );
}
