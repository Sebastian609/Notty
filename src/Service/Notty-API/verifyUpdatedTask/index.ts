import { Task } from "@/Dto/Task";


export const verifyDataDescription = (updatedTask: Task): boolean => {
    if (updatedTask.description &&   updatedTask.description.trim() === "") {
      return false;
    } else {
      return true;
    }
  };

export  const verifyDataName = (updatedTask: Task): boolean => {
    if (updatedTask.name.trim() === "") {
      return false;
    } else {
      return true;
    }
  };