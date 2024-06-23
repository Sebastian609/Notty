"use client";
import React, { ChangeEvent, useState } from "react";
import { CreateTask } from "../../Shared/Icons/Create-Task";
import useDateFormat from "@/hooks/useDateFormat/useDateFormat";
import { Task } from "@/Dto/Task";
import { getCookie } from "@/Service/Cookies/cookies";
import { useRouter } from "next/navigation";
import { User } from "@/Dto/User";
import useTaskState from "@/hooks/useTaskState/useTaskState";

export default function TaskCreator() {
  const { getTomorrowFormatedDeadline } = useDateFormat();
  const { createTask } = useTaskState();
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState<string>(getTomorrowFormatedDeadline());
  const router = useRouter();

  const createNewTask = async (task: Task) => {
    try {
      const result = await createTask(task); // Asegúrate de esperar la llamada a createTask
      if (result === null) {
        alert("Task can't be created");
        return;
      }
      window.location.reload();
    } catch (error) {
      alert("Internal error: " + error);
    }
  };

  const handleCreateTask = async () => {
    if (taskText.trim() !== "" && deadline !== "") {
      console.log(taskText);
      const userId = getCookie("idUser");

      if (userId === undefined) {
        alert("Inicia sesión nuevamente");
        router.push("/login");
        return;
      }

      const userOwner: User = {
        idUser: parseInt(userId),
      };

      const newTask: Task = {
        idUserCreator: parseInt(userId),
        name: taskText,
        description: "",
        activeTask: "true",
        timeLimit: deadline,
        userOwner: userOwner,
      };

      setTaskText("");
      console.log(newTask);
      await createNewTask(newTask); // Asegúrate de esperar la creación de la nueva tarea
    } else {
      alert("Por favor, ingresa el texto de la tarea y selecciona una fecha y hora.");
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita que se envíe el formulario (si está dentro de un formulario)
      handleCreateTask();
    }
  };

  const handleDeadlineChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setDeadline(inputValue); // Actualizar el estado con la nueva fecha y hora seleccionada
  };

  return (
    <section className="focus:bg-none w-full overflow-hidden h-16 rounded-full border-2 flex flex-row justify-between items-center">
      <input
        className="w-full pl-5 bg-white focus:border-none active:border-none selection:border-none flex items-center"
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Ready for a new task?"
        onKeyPress={handleKeyPress}
      />

      <div className="flex flex-row items-center gap-1 h-full">
        <input
          type="datetime-local"
          onChange={handleDeadlineChange}
          value={deadline ? deadline : ""}
        />

        <button
          className="bg-emerald-400 h-5/6 my-2 mx-1 hover:border-2 hover:border-emerald-500 flex aspect-square justify-center items-center hover:bg-white transition font-medium text-2xl rounded-full"
          onClick={handleCreateTask}
        >
          <div className="flex justify-between items-center gap-4">
            <CreateTask className="w-10 h-10 p-1 hover:scale-75 transition hover:stroke-emerald-400 stroke-white" />
          </div>
        </button>
      </div>
    </section>
  );
}
