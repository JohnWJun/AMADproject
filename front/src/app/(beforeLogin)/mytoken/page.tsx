"use client";
import {useRouter} from "next/navigation";
import { useEffect } from "react";
import {useRecoilState} from "recoil";

export default function Page() {


    const router =useRouter();

    useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('access_token');
    const refreshToken = urlParams.get('refresh_token');
        if (accessToken && refreshToken) {
            localStorage.setItem('Authorization', accessToken);
            localStorage.setItem('Refresh', refreshToken);
            // setAuthorizationToken(accessToken);
            // setRefreshToken(secondToken);

            router.replace('/home');
        } else {
            console.error('Access or refresh token is missing');
        }
    }, []); // Empty dependency array ensures this effect runs only once after component mount

    return null; // or any loading indicator if needed
}