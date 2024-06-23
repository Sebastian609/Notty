"use client";

import React, { useEffect, useState } from "react";
import { Task } from "@/Dto/Task";
import { TaskCard } from "../TaskCard";
import { getMainTasks } from "@/Service/Notty-API/getMainTasks";
import useTaskState from "@/hooks/useTaskState/useTaskState";

interface TaskListProsp{
  tasksList: Task[]
}
export const TaskList = (props:TaskListProsp) => {
const {tasksList} =  props
  const [tasks, setTasks] = useState<Task[]>(tasksList);
  const { deleteTaskById } = useTaskState()


  const handleOnDeleting = async (idTask: number) => {
    const res = await deleteTaskById(idTask)
    if(res){
      setTasks(tasks.filter(task => task.idTask !== idTask));
    }
  };

  return (
    <section className="w-1/4 h-full animate-jump-in animate-once overflow-y-scroll flex flex-col gap-4 items-center">
      {tasks?.map((task: Task) => (
        <TaskCard onDelete={()=>handleOnDeleting(task.idTask)} task={task} key={task.idTask} />
      ))}
    </section>
  );
};
