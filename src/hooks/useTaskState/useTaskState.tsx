import { Task } from "@/Dto/Task";
import { createNewTask } from "@/Service/Notty-API/createNewTask";
import { deleteTask } from "@/Service/Notty-API/deleteTask";
import { setTaskAsComplete } from "@/Service/Notty-API/setTaskAsComplete";


const useTaskState = () => 
{
  const markTaskAsComplete = async (idTask: number) => {
    const newTask = await setTaskAsComplete(idTask);
    return newTask;
  };

  const updateTask = async(updatedTask:Task) =>{
    const newTask: Task = await updateTask(updatedTask);
    return newTask;
  }

  const deleteTaskById = async(idTask:number) =>{
    const res: boolean = await deleteTask(idTask);
    return res  }

  const createTask = async(task:Task):Promise<Task|null> => {
    try {
      const newTask:Task =  await createNewTask(task)
      if(newTask===null){
        return null
      }
      return newTask;
    } catch (error) {
      console.log("Error task creation");
      return null
      
    }
    
  }


  return { markTaskAsComplete, updateTask,deleteTaskById,createTask };
};
export default useTaskState;
