import {redirect} from "next/navigation";

type Props2 = {
    accessToken: string,
    refreshToken: string,
    keyword: string,
    page: number
}
export async function getPostBySearch ({accessToken,refreshToken,keyword, page}:Props2) {

  
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/search?keyword=${keyword}&page=${page}&size=3`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/search?keyword=${keyword}&page=${page}&size=3`, {
                method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        "ngrok-skip-browser-warning": "69420",
                        "Authorization": "Bearer "+ accessToken,
                        "Refresh": "Bearer "+ refreshToken

                    },
                    credentials: 'include',
                });

    if (response.status === 302) {


        const newAccessToken = response.headers.get('Authorization') || '';
        const newRefreshToken = response.headers.get('Refresh') || '';


        if (newAccessToken != null) {

            localStorage.setItem("Authorization", newAccessToken);
            localStorage.setItem("Refresh", newRefreshToken);
            const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/search?keyword=${keyword}&page=${page}&size=3`, {
                method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ newAccessToken

            },
            credentials: 'include',
        });

        const data = await finalResponse.json();
        return { success: true, data };
        }


    } else{
        alert("please login again");
        redirect('/');
    }
}

if (response.status === 200) {
    const data = await response.json();

    return { success: true , data};


} else {

    return { success: false };
}
} catch (error) {
    console.error(error);
    return { success: false, error: 'An error occurred' };
}

}
