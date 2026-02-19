export const signup = async (data: any) => {
    try {
        const response = await fetch('/api/members/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.status === 201) {
            return { success: true };
        } else {
            const body = await response.json();
            return { success: false, error: body.error };
        }
    } catch (error) {
        console.error(error);
        return { success: false, error: 'An error occurred' };
    }
};
