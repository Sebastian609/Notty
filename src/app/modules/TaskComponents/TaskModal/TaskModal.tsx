import { Task } from "@/app/Dto/Task";
import React, { useEffect, useState } from "react";
import { CircleXmark } from "../../Shared/Icons/Circle-Xmark";
import useDateFormat from "@/app/hooks/useDateFormat/useDateFormat";
import { Combobox } from "../../ui/Combobox/Combobox";
import { updateTask } from "@/app/Service/Notty-API/updateTask";
import { CalendarComponent } from "../../ui/CalendarComponent";
import useTaskState from "@/app/hooks/useTaskState/useTaskState";
import { setTaskAsComplete } from "@/app/Service/Notty-API/setTaskAsComplete";

interface TaskModalProps {
  task: Task;
  onHideModal: (updatedTask: Task) => void; // Función para ocultar el modal

}

export default function TaskModal(props: TaskModalProps) {
  type Status = {
    value: string;
    label: string;
  };
  
  const { task, onHideModal} = props;
  const { formatDate } = useDateFormat();
  const [localTaskData, setLocalTaskData] = useState<Task>(task)
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [timeLimit, setTimeLimit] = useState(task.timeLimit);
  const [status, setStatus] = useState<Status | null>({
    value: task.taskStatus,
    label: task.taskStatus,
  });

  const updateLocal = () =>{
   const updatedTask = new Task({
      idTask: task.idTask,
      idUserCreator: task.idUserCreator,
      taskStatus: task.taskStatus,
      name: name,             
      description: description,
      createrAt: task.createrAt,
      updatedAt: task.updatedAt,
      timeLimit: task.timeLimit,
      activeTask: task.activeTask,
      userOwner: { idUser: task.userOwner.idUser }
    });
    return updatedTask
  }



  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    setLocalTaskData(updateLocal());

  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = event.target.value;
    setDescription(newDescription);
    setLocalTaskData(updateLocal());

  };
  
  

  const handleTimeLimitChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeLimit(event.target.value);
  };

  const handleModalHide = () => {
    onHideModal(localTaskData);
  };

  return (
    <div>
      <div className="fixed inset-0 flex justify-center items-center  z-10">
        <div
          className="animate-fade animate-once fixed inset-0 z-20 bg-gray-500 bg-opacity-75"
          onClick={handleModalHide}
        ></div>
        <div className="animate-jump-in animate-once bg-white flex w-1/3 gap-4 flex-col p-8 rounded-lg shadow-lg absolute z-40">
          <CircleXmark
            onClick={handleModalHide}
            className="w-5 h-5 absolute top-4 right-4 transition ease-in hover:scale-110 fill-slate-600 hover:fill-red-500 cursor-pointer"
          />

          <Combobox currentDeadline={timeLimit} currentStatus={status} />

          <label>Title: </label>
          <input
            className="text-lg font-bold pb-2 border-b-2 focus:outline-none"
            value={name}
            onChange={handleNameChange}
            
          />

          <label>Description: </label>
          <input
            className="text-lg selection:none pb-2 border-b-2 focus:outline-none"
            value={description}
            onChange={handleDescriptionChange}  
            required
          />

          <div>
            <label htmlFor="deadline">Deadline: </label>
            <CalendarComponent dateString={timeLimit} />
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Created at: {formatDate(task.createrAt)}
            </p>
            <button
              onClick={handleModalHide}
              className="mr-2 bg-white border-2 border-red-600 text-red-600 flex flex-row gap-2 hover:bg-red-600 hover:text-white py-2 px-4 rounded-xl transition ease-in duration-300"
            >
              <p>Delete Task</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
