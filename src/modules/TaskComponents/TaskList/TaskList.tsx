"use client";

import React, { useEffect, useState } from "react";
import { Task } from "@/Dto/Task";
import { TaskCard } from "../TaskCard";
import { getMainTasks } from "@/Service/Notty-API/getMainTasks";
import useTaskState from "@/hooks/useTaskState/useTaskState";


export const TaskList = () => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const { deleteTaskById } = useTaskState()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getMainTasks(14);
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

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
