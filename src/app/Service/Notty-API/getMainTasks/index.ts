import { Task } from "@/app/Dto/Task";

export const getMainTasks = async () => {
    console.log(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/owner/14`)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/owner/14`, {
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_NOTTY_API_KEY || ''
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();
        console.log(data)

        // Mapea los datos de la respuesta a objetos Task
        const tasks: Task[] = data.map((taskData: any) => ({
            idTask: taskData.idTask,
            idUserCreator: taskData.idUserCreator,
            taskStatus: taskData.taskStatus,
            name: taskData.name,
            description: taskData.description,
            createrAt: taskData.createrAt,
            updatedAt: taskData.updatedAt,
            timeLimit: taskData.timeLimit,
            activeTask: taskData.activeTask,
            userOwner: {
                idUser: taskData.userOwner.idUser
            }
        }));

        return tasks;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return []; // Devuelve una lista vacía en caso de error
    }
};