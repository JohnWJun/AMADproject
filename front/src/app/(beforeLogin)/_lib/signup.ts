

import {redirect} from "next/navigation";
import {processEnv} from "@next/env";
// import formidable from 'formidable';

// _lib/api.js
export const signup = async (data:any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            credentials: 'include',
        });

        if (response.status === 201) {
            return { success: true };
        } else {
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }
};
