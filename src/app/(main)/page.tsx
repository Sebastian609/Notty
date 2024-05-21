import React  from "react";
import { TaskList } from "@/modules/TaskComponents/TaskList";
import { HeaderMain } from "@/modules/HeaderMain";
import { TaskCreator } from "@/modules/TaskComponents/TaskCreator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation"



export default async function Page() {
  const cookieStore = cookies()
  const userId = cookieStore.get('userId');
  console.log(userId);
  
  if(userId==undefined){
    redirect("/login");
  }      
  
  return (
    <div className="h-lvh flex flex-col gap-5">
      <HeaderMain />
      <div className="flex pag-4 overflow-hidden h-full flex-row gap-4 ml-5 mb-5">
        <div className="border-slate-100 w-3/4">
          <TaskCreator />
        </div>
        <TaskList />
      </div>
    </div>
  );
}
