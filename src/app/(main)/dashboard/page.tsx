import React  from "react";
import { TaskList } from "@/modules/TaskComponents/TaskList";
import { HeaderMain } from "@/modules/HeaderMain";
import { TaskCreator } from "@/modules/TaskComponents/TaskCreator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"
import { getMainTasks } from "@/Service/Notty-API/getMainTasks";



export default async function Page() {
  const cookieStore = cookies()
  const userId  = cookieStore.get('idUser');
  const token  = cookieStore.get('token');
  console.log(token);

  
  
  if(userId==undefined && token ==undefined){
    redirect("/login");
  }
  const id = userId as any 
  console.log(parseInt(id.value));
  
    const tasks = await getMainTasks(parseInt(id.value))
  
  return (
    <div className="h-lvh flex flex-col gap-5">
      <HeaderMain />
      <div className="flex pag-4 overflow-hidden h-full flex-row gap-4 ml-5 mb-5">
        <div className="border-slate-100 w-3/4">
          <TaskCreator />
        </div>
        <TaskList tasksList={tasks}  />
      </div>
    </div>
  );
}
