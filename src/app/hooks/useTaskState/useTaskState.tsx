import { setTaskAsComplete } from "@/app/Service/Notty-API/setTaskAsComplete";

const useTaskState = () => {
    const markTaskAsComplete = (idTask: number) => {
    setTaskAsComplete(idTask)
    }
    

    const deleteTask = (idTask: number) => {
        alert("Task deleted");
    }
    

    const updateTask = (idTask: number) => {
        alert("updated");
    }
  

    return { markTaskAsComplete, deleteTask, updateTask };
}
export default useTaskState;
