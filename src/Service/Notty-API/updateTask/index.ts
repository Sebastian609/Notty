import { Task } from "@/Dto/Task";

export const updateTask = async (updatedTask: Task): Promise<Task> => {
    try {
        
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': process.env.NEXT_PUBLIC_NOTTY_API_KEY || ''
                },
                body: JSON.stringify(updatedTask)
            }
        );

        if (!response.ok) {
            console.log("error")
            throw new Error('Failed to update task');
            
        }

        const taskData = await response.json();

        // Verifica si la respuesta tiene el formato esperado
        if (!taskData || typeof taskData !== 'object') {
            console.log("error")
            throw new Error('Invalid task data received');
        }

        // Crea una nueva instancia de Task con los datos recibidos
        const updatedTaskInstance: Task = new Task({
            idTask: taskData.idTask,
            idUserCreator: taskData.idUserCreator,
            taskStatus: taskData.taskStatus,
            name: taskData.name,
            description: taskData.description,
            createrAt: taskData.createrAt,
            updatedAt: taskData.updatedAt,
            timeLimit: taskData.timeLimit,
            activeTask: taskData.activeTask,
            userOwner: { idUser: taskData.userOwner.idUser }
        });
        console.log(updatedTaskInstance)
        return updatedTaskInstance;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};
