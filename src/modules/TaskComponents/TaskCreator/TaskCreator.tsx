'use client'
import React, { ChangeEvent, useEffect, useState } from "react";
import { CreateTask } from "../../Shared/Icons/Create-Task";
import { ScheduleIcon } from "../../Shared/Icons/SheduleIcon";
import useDateFormat from "@/hooks/useDateFormat/useDateFormat";
import { log } from "console";

export default function TaskCreator() {
  const { getTomorrowFormatedDeadline } = useDateFormat();
  
  const [taskText, setTaskText] = useState("");
  const [deadline, setDeadline] = useState<string>(getTomorrowFormatedDeadline()); // Inicializar con la fecha actual en formato ISO
  


  
  const handleCreateTask = () => {
    if (taskText.trim() !== "" && deadline !== "") {
    
      // Aquí puedes realizar otras acciones, como enviar la tarea a un servidor, etc.
      setTaskText(""); // Limpiar el campo de texto después de crear la tarea
     
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
    if (inputValue) {
      // Solo actualizar el estado si el valor no está vacío
      console.log(inputValue);
      
      setDeadline(inputValue); // Actualizar el estado con la nueva fecha y hora seleccionada
    } else {
      setDeadline(""); // Si el valor es vacío, establecer el estado como una cadena vacía
    }
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
          onChange={(e) => handleDeadlineChange(e)}
          value={deadline ? deadline : ""}
        />
       
        <button
          className="bg-emerald-400 h-5/6 my-2 mx-1 hover:border-2 hover:border-emerald-500 flex aspect-square justify-center items-center hover:bg-white transition font-medium text-2xl h rounded-full"
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
