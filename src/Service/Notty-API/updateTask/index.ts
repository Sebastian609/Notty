
import { Task } from "@/Dto/Task";
import { User } from "@/Dto/User";
import { getCookie } from "@/Service/Cookies/cookies";


export const updateTask = async (updatedTask: Task): Promise<Task> => {
  
    
    const cookieToken = getCookie('token')
    const userId = getCookie("idUser")  
    
    const token = cookieToken?.split(",")[0].trim()
    const auth = `Bearer ${token}`;
    console.log(updatedTask);
    

    
    try {
        if(userId===undefined){
            throw new Error('Invalid user id');
        }
        console.log(updatedTask);
        
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks`,
            {
                method: 'PUT',
                   
                headers: {
                    'Authorization': auth,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(updatedTask)
            }
        );

        if (!response.ok) {
            console.log("error", response)
            throw new Error('Failed to update task');
            
        }

        const taskData = await response.json();

        // Verifica si la respuesta tiene el formato esperado
        if (!taskData || typeof taskData !== 'object') {
            console.log("error")
            throw new Error('Invalid task data received');
        }

        const userOwner: User = {
            idUser: parseInt(userId),
        }

        // Crea una nueva instancia de Task con los datos recibidos
        const updatedTaskInstance: Task = {
            idTask: taskData.idTask,
            type:"PERSONAL",
            idUserCreator: userOwner,
            taskStatus: taskData.taskStatus,
            name: taskData.name,
            description: taskData.description,
            createrAt: taskData.createrAt,
            updatedAt: taskData.updatedAt,
            timeLimit: taskData.timeLimit,
            activeTask: taskData.activeTask,
            userOwner:  userOwner
        };
        /*
         {
    idTask: 1,
    idUserCreator: 14,
    taskStatus: 'COMPLETED',
    name: 'hacer 2 hh',
    description: 'enviarlas antes del amuerzo',
    createrAt: '2024-04-24T18:55:21',
    updatedAt: '2024-06-23T18:53:47.839',
    timeLimit: '2024-04-27T16:00:00',
    activeTask: true,
    userOwner: { idUser: 14 }
  }
        */
        console.log(updatedTask)
        return updatedTaskInstance;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};
