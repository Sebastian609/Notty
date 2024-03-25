import React, { useState } from "react";
import CirclePrimaryButton from "../buttons/CirclePrimaryButton";
import { Task } from "../../../Dto//Task";

const TaskCreator: React.FC = () => {
  const [title, setTitle] = useState("");
  const [list, setList] = useState<Task[]>([]); // Inicializa list como un array de Task

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length <= 90) {
      setTitle(event.target.value);
    }
  };

  const handleClick = (): void => {
    if (title.trim() !== "") {
      // Crear una nueva tarea y agregarla a la lista
      const task = new Task(title); // Asigna un nuevo ID basado en la longitud de la lista
      setList([...list, task]); // Agrega la nueva tarea a la lista usando el operador de propagación
      alert("Tarea Guardada: " + title);
      setTitle("");
      console.log(list);
    }
  };

  return (
    <div className="flex flex-row justify-between h-16 md:w-1/2 rounded-full border-2 shadow-lg items-center shadow-indigo-400/50 border-slate-300 pr-2 pl-4 w-full">
      <input
        className="p-2 w-full focus:outline-0 hover:opacity-80 duration-300"
        type="text"
        placeholder="¿Qué haremos ahora?"
        value={title}
        onChange={handleChange}
        maxLength={90}
      />
      <div onClick={handleClick}>
        <CirclePrimaryButton />
      </div>
    </div>
  );
};

export default TaskCreator;
