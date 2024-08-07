"use client";

import { CircleCheck } from "../../Shared/Icons/Circle-Check";
import { Task } from "@/Dto/Task";
import useDateFormat from "@/hooks/useDateFormat/useDateFormat";
import React, { useState } from "react";
import { setTaskAsComplete } from "@/Service/Notty-API/setTaskAsComplete";
import { TaskStatus } from "../TaskStatus";
import { Trash } from "../../Shared/Icons/Trash";
import { TaskModal } from "../TaskModal";
import { updateTask } from "@/Service/Notty-API/updateTask";
import {
  verifyDataDescription,
  verifyDataName,
} from "@/Service/Notty-API/verifyUpdatedTask";
import { on } from "events";
import { Alert } from "../../ui/Alert";

interface TaskProps {
  task: Task;
  onDelete:()=>void
}

export default function TaskCard(props: TaskProps) {
  let { task,onDelete } = props;
  const [localTaskData, setLocalTaskData] = useState<Task>(task);
  const { formatDate } = useDateFormat();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal


  const handleTrashClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onDelete()

  };

  const handleCircleCheckClick = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if(!task.idTask){
      return
    }
    const data = await setTaskAsComplete(task.idTask);
    console.log(data);
    setLocalTaskData(data);
  };

  const verifyData = (updatedTask: Task): Task => {



    if (!verifyDataName(updatedTask)) {
      updatedTask.name = task.name;
    }

    if (!verifyDataDescription(updatedTask)) {
      updatedTask.description = task.description;
    }

    updatedTask.type="PERSONAL"


    return updatedTask;
  };


  const handleHideModal = async (updatedTask: Task) => {
    setIsModalOpen(false);
    console.log(updatedTask);
    const data = verifyData(updatedTask)
    const result = await updateTask(data)
    setLocalTaskData(result);
   
  };

  return (
    <div className="w-full ">
      <div
        className="hover:bg-slate-50 border-2 rounded-lg w-full flex-col flex gap-2 p-4 hover:cursor-pointer hover:scale-95 transition "
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex flex-row justify-between">
          <p className="font-bold text-xl text-left">{localTaskData.name}</p>

          <TaskStatus statusName={localTaskData.taskStatus}  />
        </div>
        <p>{localTaskData.description}</p>
        <div className="flex flex-row justify-between">
          <p className="text-slate-500 text-sm">
            Deadline: {formatDate(localTaskData.timeLimit)}
          </p>
          <div className="flex flex-row items-center justify-center gap-2">
            <Trash
              onClick={handleTrashClick}
              className="w-6 h-6 transition ease-in hover:-translate-y-1 hover:scale-110 fill-slate-600  hover:fill-red-500"
            />
             
            
            {localTaskData.taskStatus == "IN_PROGRESS" && (
              <CircleCheck
                onClick={handleCircleCheckClick}
                className=" w-6 h-6 transition ease-in hover:-translate-y-1 hover:scale-110 fill-slate-600  hover:fill-emerald-500"
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <TaskModal onHideModal={handleHideModal} task={localTaskData} />
      )}
    </div>
  );
}
