"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Task } from "@/app/Dto/Task";
import { TaskCard } from "../TaskCard";
import { getMainTasks } from "@/app/Service/Notty-API/getMainTasks";

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksData = await getMainTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <section className="w-1/4 h-full animate-jump-in animate-once overflow-y-scroll flex flex-col gap-4 items-center">
      
        {tasks.map((task: Task) => {
          return task.activeTask !== "0" ? (
            <TaskCard task={task} key={task.idTask} />
          ) : null;
        })}
      
    </section>
  );
};
