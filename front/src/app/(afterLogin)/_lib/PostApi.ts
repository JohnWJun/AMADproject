
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
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${email}`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${email}`, {
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

type Props2 = {
    accessToken: string,
    refreshToken: string,
    page: number
}
export async function getTodayPosts ({accessToken,refreshToken, page}:Props2) {

    const tdy = new Date();
    const year = tdy.getFullYear();
    const month = tdy.getMonth()+1 <10 ? '0'+(tdy.getMonth()+1): tdy.getMonth()+1;
    const day = tdy.getDate()<10 ? '0'+(tdy.getDate()): tdy.getDate();
    const localDateForm = year+'-'+month+'-'+day;
    console.log(`${localDateForm}?page=${page}&size=3`)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/today/${localDateForm}?page=${page}&size=3`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

                const response =await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/today/${localDateForm}?page=${page}&size=3`, {
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
        const finalResponse =await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/today/${localDateForm}?page=${page}&size=10`, {
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

export async function getPostDetail ({accessToken,refreshToken, postId}:any) {

    const tdy = new Date();
    const year = tdy.getFullYear();
    const month = tdy.getMonth()+1 <10 ? '0'+(tdy.getMonth()+1): tdy.getMonth()+1;
    const day = tdy.getDate()<10 ? '0'+(tdy.getDate()): tdy.getDate();
    const localDateForm = year+'-'+month+'-'+day;
    console.log(localDateForm);
    console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`);
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/detail/${postId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        console.log(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}`)
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/detail/${postId}`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/detail/${postId}`, {
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
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }

}

type PatchProps ={
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
    id: bigint,
    bibleChapterVerseId: bigint,
    amadId: bigint
}

export async function patchPost ({requestBody, accessToken,refreshToken, id, bibleChapterVerseId,amadId}:PatchProps) {


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${id}/${bibleChapterVerseId}/${amadId}`, {
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${id}/${bibleChapterVerseId}/${amadId}`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${id}/${bibleChapterVerseId}/${amadId}`, {
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
    accessToken:string,
    refreshToken: string,
    page: number,
    email: string
}

export async function getLastPosts ({accessToken,refreshToken, page, email}:Props3) {


    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/last/${email}?page=${page}&size=10`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/last/${email}?page=${page}&size=10`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/last/${email}?page=${page}&size=10`, {
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
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }

}

export async function getPosts ({accessToken,refreshToken, page}:Props2) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/all?page=${page}&size=3`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/all?page=${page}&size=3`, {
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/all?page=${page}&size=3`, {
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
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }

}

type Props4 = {
    accessToken: string,
    refreshToken: string,
    postId: bigint,
    memberId: bigint
}


export async function postLike ({accessToken, refreshToken, postId, memberId}:Props4) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/${memberId}/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            credentials: 'include',
        });
        if (response.status === 401 ) {

            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/${memberId}/like`, {
                method: 'POST',
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
                    const finalResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/post/${postId}/${memberId}/like`, {
                        method: 'POST',
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
            const data = await response.json();
            return { success: false, error: data.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }

}