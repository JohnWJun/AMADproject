// "use client";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import {useEffect, useState} from "react";

// // const isBrowser = typeof window !== 'undefined';
//
// type CustomStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
//
// let storage: CustomStorage | undefined;
//
// // Use localStorage in the browser environment
//
// if (typeof window !== 'undefined') {
//     // Code that relies on window
//     storage = window.localStorage as CustomStorage;
// } else {
//     // Handle the case where window is not available
//     storage = undefined; // or any other appropriate behavior
// }
const localStorage =
    typeof window !== "undefined" ? window.localStorage : undefined;

const { persistAtom } = recoilPersist({
    key: "recoil-states",
    storage: localStorage
});


export const Member = atom({
    key: 'Member',
    default: {
        id: 0,
        nickname:'',
        statusImg: '',
        email:'',
        intimacy: 0,
        roles: []
    },
    effects_UNSTABLE: [persistAtom]
});


