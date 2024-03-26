type Props ={
    accessToken:string,
    refreshToken: string,
    bible: string,
    chapter: string,
    from: string,
    to: string
}

export const getBible = async ({ accessToken,refreshToken, bible,chapter,from, to}:Props)=>{
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/api-bible/${bible}/${chapter}/${from}/${to}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
    
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/api-bible/${bible}/${chapter}/${from}/${to}`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/api-bible/${bible}/${chapter}/${from}/${to}`, {
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
                return {success: false, error: '409'}
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