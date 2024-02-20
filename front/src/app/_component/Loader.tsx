import style from "@/app/_component/loader.module.css";
import Link from "next/link";


export default function Loader(){

    return (
        <div className={style.loaderRoot}>
            <div className={style.container}>


                <div className={style.card}>
                    <h1>Data is loading...</h1>
                    <p>please wait for a moment</p>
                    <div className={style.loader}>
                        <div className={style.spin}></div>
                        <div className={style.bounce}></div>
                    </div>
                </div>


            </div>
        </div>
    )
}