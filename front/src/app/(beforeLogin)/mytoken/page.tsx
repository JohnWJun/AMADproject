"use client";
import {useRouter} from "next/navigation";

export default function Page() {


    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
    localStorage.setItem('Authorization', accessToken ?? '');
    localStorage.setItem('Refresh', refreshToken ?? '');

    const router =useRouter();


    router.replace('/home');
    return null

}