import { Task } from "@/app/Dto/Task"

export const setTaskAsComplete  = async (idTask: number) =>{

    try {
        const response = await fetch(`${process.env}/tasks/changeStatus/${idTask}`, {
            headers: {
                'Authorization': process.env.NOTTY_API_KEY || ''
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }

        const data = await response.json();

        const task: Task = data.map((taskData: any) => ({
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
        return task;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        return []; 
    }
}