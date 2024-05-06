import { Task } from "@/app/Dto/Task";
import { setTaskAsComplete } from "@/app/Service/Notty-API/setTaskAsComplete";
import { updateTask } from "@/app/Service/Notty-API/updateTask";

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


  return { markTaskAsComplete, updateTask };
};
export default useTaskState;
