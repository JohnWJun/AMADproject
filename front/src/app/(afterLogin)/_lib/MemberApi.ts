
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
        if (response.status === 401 && refreshToken) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/me`, {
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

                setMemberInfo(data);
                localStorage.setItem("Authorization",refreshToken);
                localStorage.removeItem("Refresh");

                return { success: true };

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
        if (response.status === 401 && refreshToken) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/members/${emailToFind}`, {
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

                return { success: true ,data};

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