import style from './amadAbstractSection.module.css';
import Trend from "@/app/(afterLogin)/_component/AmadAbstract";
import AmadAbstract from "@/app/(afterLogin)/_component/AmadAbstract";

export default function AmadSection() {
    return (
        <div className={style.trendBg}>
            <div className={style.trend}>
                <h3>나의 AMAD</h3>
                <AmadAbstract />

            </div>
        </div>
    )
}