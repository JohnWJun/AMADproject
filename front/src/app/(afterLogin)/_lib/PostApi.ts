
import {redirect} from "next/navigation";

type Props ={
    requestBody: {
        bibleVerses: {
            bible: string,
            bibleChapter: number,
            bibleVerseFrom: number,
            bibleVerseTo: number

        }[],
        title: string,
        content_1: string,
        content_2: string,
        content_3: string,
        content_4: string,
        content_5: string,
        myAmad: string,
    },
    accessToken: string,
    refreshToken: string,
    email: string
}
export const postPost = async ({requestBody, accessToken,refreshToken, email}:Props)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        });
        if (response.status === 401 && refreshToken) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${email}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": "Bearer "+ refreshToken

                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });
            if (response.status === 201) {
                const data = await response.json();

                localStorage.setItem("Authorization",refreshToken);
                localStorage.removeItem("Refresh");

                return { success: true, data };

            } else{
                alert("please login again");
                redirect('/');
            }
        }

        if (response.status === 201) {
            const data = await response.json();

            return { success: true , data};


        } else {
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }

}