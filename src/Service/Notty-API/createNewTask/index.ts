import { Task } from "@/Dto/Task";
import { getCookie } from "@/Service/Cookies/cookies";

export const createNewTask = async (newTask: Task): Promise<Task> => {

    const cookieToken = getCookie('token')
    
    const token = cookieToken?.split(",")[0].trim()
    const auth = `Bearer ${token}`;


    try {
        console.log(newTask)
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth
                },
                body: JSON.stringify(newTask)
            }
        );

        if (!response.ok) {
            console.log("error")
            throw new Error('Failed to update task');
            
        }

        const taskData = await response.json();
        console.log(taskData);
        
        // Verifica si la respuesta tiene el formato esperado
        if (!taskData || typeof taskData !== 'object') {
            console.log("error")
            throw new Error('Invalid task data received');
        }

        // Crea una nueva instancia de Task con los datos recibidos
        const newTaskInstance: Task = taskData
        console.log(newTaskInstance)
        return newTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};
