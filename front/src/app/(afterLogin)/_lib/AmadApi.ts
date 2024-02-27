import {redirect} from "next/navigation";

type Props ={
    requestBody:{
        mission: string,
        complete:boolean
    }
    accessToken: string,
    refreshToken: string,
    myAmadId: bigint
}
export const patchAmadAccomplished = async ({ requestBody,accessToken,refreshToken, myAmadId}:Props)=>{
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/amad/${myAmadId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                "ngrok-skip-browser-warning": "69420",
                "Authorization": "Bearer "+ accessToken

            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
        });
        if (response.status === 401 && refreshToken) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/amad/${myAmadId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "ngrok-skip-browser-warning": "69420",
                    "Authorization": "Bearer "+ refreshToken

                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });
            if (response.status === 200) {
                const data = await response.json();

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