import { Task } from "@/Dto/Task";
import { getCookie } from "@/Service/Cookies/cookies";

export const setTaskAsComplete = async (idTask: number): Promise<Task> => {

    const cookieToken = getCookie('token')
    const userId = getCookie("idUser")  
    console.log(userId);
    
    const token = cookieToken?.split(",")[0].trim()
    const auth = `Bearer ${token}`;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NOTTY_BACKEND_HOSTNAME}/tasks/changeStatus/${idTask}`, 
      {
        method: 'GET',  // Asegúrate de usar el método PUT si es necesario
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      throw new Error(`Failed to update task status: ${response.status} ${response.statusText}`);
    }

    const taskData: Task = await response.json();

    // Verifica si la respuesta tiene el formato esperado
    if (!taskData || typeof taskData !== 'object') {
      console.error('Invalid task data received:', taskData);
      throw new Error('Invalid task data received');
    }

    // Aquí puedes retornar la tarea actualizada si lo necesitas, o puedes manejarla de otra manera según tus necesidades
    return taskData;
  } catch (error) {
    console.error('Error updating task status:', error);
    throw error;
  }
};
