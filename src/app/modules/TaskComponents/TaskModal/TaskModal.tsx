import { Task } from "@/app/Dto/Task";
import React, { useEffect, useState } from "react";
import { CircleXmark } from "../../Shared/Icons/Circle-Xmark";
import useDateFormat from "@/app/hooks/useDateFormat/useDateFormat";
import { Combobox } from "../../ui/Combobox/Combobox";

interface TaskModalProps {
  task: Task;
  onHideModal: (updatedTask: Task) => void; 
}

export default function TaskModal(props: TaskModalProps) {
  type Status = {
    value: string;
    label: string;
  };

  const { task, onHideModal } = props;
  const { formatDate } = useDateFormat();
  const [localTaskData, setLocalTaskData] = useState<Task>(task);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [deadline, setDeadline] = useState(task.timeLimit);
  const [status, setStatus] = useState<Status | null>({
    value: task.taskStatus,
    label: task.taskStatus,
  });

  useEffect(() => {
    const updatedTask = new Task({
      idTask: task.idTask,
      idUserCreator: task.idUserCreator,
      taskStatus: status!=null?status.value:task.taskStatus,
      name: name,
      description: description,
      createrAt: task.createrAt,
      updatedAt: task.updatedAt,
      timeLimit: deadline,
      activeTask: task.activeTask,
      userOwner: { idUser: task.userOwner.idUser },
    });
  
    setLocalTaskData(updatedTask);
  }, [deadline, name, description, task,status]);
  

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);

  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newDescription = event.target.value;
    setDescription(newDescription);

  };

  const handleDeadLineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDeadline = event.target.value;
    setDeadline(newDeadline);

  };

  const handleSelectedStatus = (status:Status) => {
    const newStatus = status;
    setStatus(newStatus);
  }

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

          <Combobox handleSelectedStatus={handleSelectedStatus} currentDeadline={deadline} currentStatus={status} />

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
            <input
              onChange={handleDeadLineChange}
              className="p-2 border-1 border-slate-500 rounded-lg"
              type="datetime-local"
              value={deadline}
            ></input>
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
