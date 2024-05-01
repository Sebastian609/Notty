"use client";

import { CircleCheck } from "../../Shared/Icons/Circle-Check";
import { Task } from "@/app/Dto/Task";
import useDateFormat from "@/app/hooks/useDateFormat/useDateFormat";
import React from "react";
import { CircleXmark } from "../../Shared/Icons/Circle-Xmark";
import { Edit } from "../../Shared/Icons/Edit";
import useTaskState from "@/app/hooks/useTaskState/useTaskState";

interface TaskProps {
  task: Task;
}

export default function TaskCard(props: TaskProps) {
  const { task } = props;
  const { formatDate } = useDateFormat();
  const { markTaskAsComplete } = useTaskState();

  return (
    <div className="border-2 rounded-lg w-full flex-col flex gap-2 p-4">
      <div className="flex flex-row justify-between">
        <p className="font-bold text-xl text-left">{task.name}</p>
        <p>{task.taskStatus}</p>
      </div>
      <p>{task.description}</p>
      <div className="flex flex-row justify-between">
        <p className="text-slate-500 text-sm">
          Deadline: {formatDate(task.timeLimit)}
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <CircleXmark className="w-6 h-6 transition ease-in  fill-slate-600  hover:fill-red-500" />
          <CircleCheck
            onClick={()=> markTaskAsComplete(task.idTask)}
            className="w-6 h-6 transition ease-in  fill-slate-600  hover:fill-emerald-500"
          />
          <Edit className="w-6 h-6 transition ease-in  fill-slate-600  hover:fill-cyan-500" />
        </div>
      </div>
    </div>
  );
}
