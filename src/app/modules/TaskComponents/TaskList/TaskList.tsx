import { Task } from "@/app/Dto/Task";
import { TaskCard } from "../TaskCard";
import { getMainTasks } from "@/app/Service/Notty-API/getMainTasks";

export const TaskList = async() => {
    const tasks =  await  getMainTasks();
  return (
    <section className="w-1/4 h-full overflow-y-scroll flex flex-col  gap-4  items-center ">
    {
        tasks.map((task:Task)=>(<TaskCard task={task} key={task.idTask}/>))
    }
    </section>
  )
}
