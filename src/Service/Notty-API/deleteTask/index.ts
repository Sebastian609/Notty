import { getCookie } from "@/Service/Cookies/cookies";


export const deleteTask = async (idTask: number): Promise<boolean> => {
    const cookieToken = getCookie('token')
    const token = cookieToken?.split(",")[0].trim()
    const auth = `Bearer ${token}`;

    try {

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/delete/${idTask}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                },
                
            }
        );

        if (!response.ok) {
            console.log("error " +response)
            throw new Error('Failed to DELETE task:  '+response );
            
        }

        const res = await response.json();
        
        // Verifica si la respuesta tiene el formato esperado
        if (!res || typeof res !== 'boolean') {
            console.log("error")
            throw new Error('Invalid task data received: ' +res);
        }

        return res;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};
