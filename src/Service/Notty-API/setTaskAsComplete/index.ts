import { Task } from "@/app/Dto/Task";

export const setTaskAsComplete = async (idTask: number): Promise<Task> => {
    try {
        console.log(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/changeStatus/${idTask}`)
        const response = await fetch(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/changeStatus/${idTask}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.NEXT_PUBLIC_NOTTY_API_KEY || ''
            }
        });

        if (!response.ok) {
            
            throw new Error('Failed to update task status');
        }

        const taskData = await response.json();

        // Aquí puedes retornar la tarea actualizada si lo necesitas, o puedes manejarla de otra manera según tus necesidades
        return taskData;
    } catch (error) {
        console.error('Error updating task status:', error);
        throw error;
    }
};
