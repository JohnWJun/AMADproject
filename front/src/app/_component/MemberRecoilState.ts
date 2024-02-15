"use client";
import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';


type CustomStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
const storage = window.localStorage as CustomStorage;

const { persistAtom } = recoilPersist({
    key: 'recoil-persist', // this key is used to store data in localStorage
    storage: storage, // configure the storage mechanism
});

export const Member = atom({
    key: 'Member',
    default: {
        id: 0,
        nickname:'',
        statusImg: '',
        email:'',
        intimacy: 0
    },
    effects_UNSTABLE: [persistAtom]
});

