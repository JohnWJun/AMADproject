import style from "@/app/_component/loader.module.css";
import Link from "next/link";

type Props ={
    header?:string,
    body?: string
}

export default function Loader({header, body}:Props){

    return (
        <>
        <div className={style.loaderRoot}>
            <div className={style.container}>


                <div className={style.card}>
                    {!header &&
                        <>
                        <h1>Data is loading...</h1>
                        <p>please wait for a moment</p>
                        </>
                    }
                    {header &&
                        <>
                        <h1>{header}</h1>
                        <p>{body}</p>
                        </>
                    }
                    <div className={style.loader}>
                        <div className={style.spin}></div>
                        <div className={style.bounce}></div>
                    </div>
                </div>
            </div>
        </div>
    </>

    )
}