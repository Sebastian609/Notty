import { Task } from "@/app/Dto/Task"

export const setTaskAsComplete  = async (idTask: number) =>{
    console.log(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/owner/14`)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/changeStatus/${idTask}`, {
            headers: {
                'Authorization': process.env.NEXT_PUBLIC_NOTTY_API_KEY || ''
            }
        });
        if (!response.ok) {
            alert("error de conexion");
            console.log(`${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/changeStatus/${idTask}`)
            throw new Error('Failed to fetch tasks');
            
        }

        const taskData = await response.json();
        

        const task: Task  = {
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
        };
        console.log(task)
        return task;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        alert(error)
       
    }
}