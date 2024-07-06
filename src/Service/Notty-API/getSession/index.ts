

export const getSession = async (email:string,password:string) => {
    console.log(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/users/login/${email.toUpperCase()}/${password}`);
    
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/users/login/${email.toUpperCase()}/${password}`, {
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_NOTTY_API_KEY || ''
            }
        });

        if (!response.ok) {
            throw new Error('wrong data');
        }

        const data = await response.json();

        return data;
    } catch (error) {
        console.error('error login: ', error);
        return []; 
    }
};