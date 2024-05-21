import { Task } from "@/Dto/Task";

export const createNewTask = async (updatedTask: Task): Promise<Task> => {
    try {
        console.log(updatedTask)
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks`,
            {
                method: 'POST',
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
        const newTask: Task = new Task({
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
        console.log(newTask)
        return newTask;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};
