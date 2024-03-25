
import {redirect} from "next/navigation";

export const getCurrentUserInfo = async ({accessToken, refreshToken, setMemberInfo}:any) => {


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/me`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/me`, {
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
            setMemberInfo(data);
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

export const getUserInfo = async ({accessToken, refreshToken, emailToFind}:any) => {


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${emailToFind}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${emailToFind}`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${emailToFind}`, {
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
            return { success: true,data };


        } else {
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }
}

type Props ={
    accessToken:string,
    refreshToken: string,
    nickname: string,
    userId: bigint,
    setMemberInfo: any
}
export const patchNickname = async ({accessToken, refreshToken, nickname, userId, setMemberInfo }:Props) => {

    const requestBody ={
        nickname: nickname
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${userId}`, {
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${userId}`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${userId}`, {
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
                alert("please login again");
                redirect('/');
            }
        }

        if (response.status === 200) {
            const data = await response.json();
            setMemberInfo(data);
            return { success: true,data };


        } else {
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }
}

export const getRecommendedFriend = async ({accessToken, refreshToken}:any) => {


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/recommend?page=1&size=3`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/recommend?page=1&size=3`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/recommend?page=1&size=3`, {
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
            return { success: true,data };


        } else {
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }
}

export const getMembers = async ({accessToken, refreshToken, page}:any) => {


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members?page=${page}&size=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members?page=${page}&size=10`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members?page=${page}&size=10`, {
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
            return { success: true,data };


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
    storedAccessToken: string,
    storedRefreshToken: string,
    memberId: bigint
}

export async function deleteMember ({storedAccessToken, storedRefreshToken, memberId}:Props2) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${memberId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ storedAccessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${memberId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": "Bearer "+ storedAccessToken,
                    "Refresh": "Bearer "+ storedRefreshToken

                },
                credentials: 'include',
            });

            if (response.status === 302) {


                const newAccessToken = response.headers.get('Authorization') || '';
                const newRefreshToken = response.headers.get('Refresh') || '';


                if (newAccessToken != null) {

                    localStorage.setItem("Authorization", newAccessToken);
                    localStorage.setItem("Refresh", newRefreshToken);
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${memberId}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            "ngrok-skip-browser-warning": "69420",
                            "Authorization": "Bearer "+ newAccessToken

                        },
                        credentials: 'include',
                    });

                
                    return { success: true };
                }


            } else{
                alert("please login again");
                redirect('/');
            }
        }

        if (response.status === 204) {
        
            return { success: true };


        } else {
           
            return { success: false};
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }

}