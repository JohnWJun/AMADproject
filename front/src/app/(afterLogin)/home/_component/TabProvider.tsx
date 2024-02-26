"use client"

import {createContext, ReactNode, useState} from "react";

export const TabContext = createContext({
    tab: 'tdy',
    setTab: (value: 'tdy' | 'all') => {},
});

type Props = { children: ReactNode };
export default function TabProvider({ children }: Props) {
    const [tab, setTab] = useState('tdy');

    return (
        <TabContext.Provider value={{ tab, setTab }}>
            {children}
        </TabContext.Provider>
    )
}