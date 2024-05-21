import { Task } from "@/app/Dto/Task";

export const verifyDataDescription = (updatedTask: Task): boolean => {
    if (updatedTask.description.trim() === "") {
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