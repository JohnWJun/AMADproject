"use client";

import style from './signup.module.css';
import {useRouter} from "next/navigation";
import {ChangeEventHandler, FormEventHandler, useState} from "react";
import BackButton from "@/app/(beforeLogin)/_component/BackButton";
import {signup} from "@/app/(beforeLogin)/_lib/signup";

export default function SignupModal() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const router = useRouter();

    const onChangeEmail: ChangeEventHandler<HTMLInputElement> = (e) => { setEmail(e.target.value)
    };


    const onSubmit: FormEventHandler = async (e) => {
        e.preventDefault();

        // const data = JSON.stringify({
        //     email: email
        // });
        //
        const data = {
            email: email
        }
        const { success, error } = await signup(data);

        if (success) {
            router.replace('/home');
        } else {
            setError(error);
        }

        // fetch('http://localhost:8080/members/sign-up', {
        //     method: 'post',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         email: email
        //     }),
        //     credentials: 'include',
        // }).then((response: Response) => {
        //     console.log(response.status);
        //     if (response.status === 201) {
        //         router.replace('/home');
        //     }
        // }).catch((err) => {
        //     console.error(err);
        // });
    }

    return (
        <>
            <div className={style.modalBackground}>
                <div className={style.modal}>
                    <div className={style.modalHeader}>
                        <BackButton/>
                        <div>계정을 생성하세요.</div>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className={style.modalBody}>
                            <div className={style.inputDiv}>
                                <label className={style.inputLabel} htmlFor="email">email</label>
                                <input id="email" className={style.input} type="text" placeholder=""
                                       value={email}
                                       onChange={onChangeEmail}
                                />
                            </div>
                        </div>
                        <div className={style.modalFooter}>
                            <button type={"submit"} className={style.actionButton}>가입하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </>)
}