

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
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${memberId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": "Bearer "+ accessToken,
                    "Refresh": "Bearer "+ refreshToken

                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });

            if (response.status === 302) {


                const newAccessToken = response.headers.get('Authorization') || '';
                const newRefreshToken = response.headers.get('Refresh') || '';


                if (newAccessToken != null) {

                    localStorage.setItem("Authorization", newAccessToken);
                    localStorage.setItem("Refresh", newRefreshToken);
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${memberId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "ngrok-skip-browser-warning": "69420",
                            "Authorization": "Bearer "+ newAccessToken

                        },
                        body: JSON.stringify(requestBody),
                        credentials: 'include',
                    });

                    const data = await finalResponse.json();
                    return { success: true, data };
                }


            } else{
                return {success: false, error: '409'}
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment?page=${page}&size=5`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },

            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment?page=${page}&size=5`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment?page=${page}&size=5`, {
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

type Props3 ={
    accessToken: string,
    refreshToken: string,
    postId: bigint,
    commentId: bigint,
}
export const deleteComment = async ({ accessToken,refreshToken, postId, commentId}:Props3)=>{

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },

            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${commentId}`, {
                method: 'DELETE',
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${commentId}`, {
                        method: 'DELETE',
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

        if (response.status === 204) {


            return { success: true };


        } else {
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }

}


type Props4 ={
    accessToken: string,
    refreshToken: string,
    postId: bigint,
    commentId: bigint,
    content: string
}
export const patchComment = async ({ accessToken, refreshToken, postId,commentId, content }:Props4)=>{
    const requestBody = {
        mention: content
    };
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${commentId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            body: JSON.stringify(requestBody),

            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${commentId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": "Bearer "+ accessToken,
                    "Refresh": "Bearer "+ refreshToken

                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });

            if (response.status === 302) {


                const newAccessToken = response.headers.get('Authorization') || '';
                const newRefreshToken = response.headers.get('Refresh') || '';


                if (newAccessToken != null) {

                    localStorage.setItem("Authorization", newAccessToken);
                    localStorage.setItem("Refresh", newRefreshToken);
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/${postId}/comment/${commentId}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                            "ngrok-skip-browser-warning": "69420",
                            "Authorization": "Bearer "+ newAccessToken

                        },
                        body: JSON.stringify(requestBody),
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