import {redirect} from "next/navigation";

type Props ={
    content: string,
    accessToken: string,
    refreshToken: string,
    postId: bigint,
    memberId: bigint
}
export const postComment = async ({ content, accessToken,refreshToken, postId, memberId}:Props)=>{
    const requestBody = {
        mention: content
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${memberId}`, {
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${memberId}`, {
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
type Props2 ={
    accessToken: string,
    refreshToken: string,
    postId: bigint,
    page: number
}
export const getComments = async ({ accessToken,refreshToken, postId, page}:Props2)=>{

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment?page=${page}&size=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },

            credentials: 'include',
        });
        if (response.status === 401 && refreshToken) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment?page=${page}&size=10`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": "Bearer "+ refreshToken

                },

                credentials: 'include',
            });
            if (response.status === 200) {
                const data = await response.json();

                localStorage.setItem("Authorization",refreshToken);
                localStorage.removeItem("Refresh");

                return { success: true, data };

            } else{
                alert("please login again");
                redirect('/');
            }
        }

        if (response.status === 200) {
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