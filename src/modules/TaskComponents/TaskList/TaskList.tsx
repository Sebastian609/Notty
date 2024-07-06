"use client";

import React, { useEffect, useState } from "react";
import { Task } from "@/Dto/Task";
import { TaskCard } from "../TaskCard";
import { getMainTasks } from "@/Service/Notty-API/getMainTasks";
import useTaskState from "@/hooks/useTaskState/useTaskState";

interface TaskListProsp {
  tasksList: Task[];
}
export const TaskList = (props: TaskListProsp) => {
  const { tasksList } = props;
  const [tasks, setTasks] = useState<Task[]>(tasksList);
  const { deleteTaskById } = useTaskState();

  const handleOnDeleting = async (idTask: number | undefined) => {
    if (idTask === undefined) {
      return;
    }
    const res = await deleteTaskById(idTask);
    if (res) {
      setTasks(tasks.filter((task) => task.idTask !== idTask));
    }
  };

  return (
    <div className="w-1/4  overflow-y-scroll">
      {tasks.length !== 0 ? (
        <section className="w-full pr-4  animate-jump-in animate-once flex flex-col gap-4 items-center">
          {tasks?.map((task: Task) => (
            <TaskCard
              onDelete={() => handleOnDeleting(task.idTask)}
              task={task}
              key={task.idTask}
            />
          ))}
        </section>
      ) : (
        <div className="flex items-center justify-center  w-full h-full border-2 rounded-lg">
          <p className="text-center font-bold w-5/6  ">You dont have pending tasks</p>
        </div>
      )}
    </div>
  );
};
