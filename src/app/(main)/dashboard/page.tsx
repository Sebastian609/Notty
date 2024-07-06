import React from "react";
import { TaskList } from "@/modules/TaskComponents/TaskList";
import { HeaderMain } from "@/modules/HeaderMain";
import { TaskCreator } from "@/modules/TaskComponents/TaskCreator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMainTasks } from "@/Service/Notty-API/getMainTasks";
import { TeamSlider } from "@/modules/TeamComponents/TeamSlider";
import { getMembershipByUserId } from "@/Service/Notty-API/Teams/getMembershipByUserId";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("idUser");
  const token = cookieStore.get("token");

  if (userId?.value == undefined && token?.value == undefined) {
    redirect("/login");
    return;
  }

  const id = userId as any;
  if (id === undefined) {
    redirect("/login");
  }
  const tasks = await getMainTasks(parseInt(id.value));
  const memberships = await getMembershipByUserId(parseInt(id.value));

  return (
    <div className="h-screen flex flex-col gap-5">
      <HeaderMain />
      <div className="flex pag-4 overflow-hidden h-full flex-row gap-4 ml-5 mb-5">
        <div className="border-slate-100 h-full w-3/4 mb-5">
          <div className="h-1/6">
            <TaskCreator />
          </div>
          <div className="border-2 h-4/6 overflow-y-scroll py-4 flex-col justify-between  gap-8 my-4 px-4 rounded-2xl">
            <h3 className="font-bold text-2xl mb-4">My Groups</h3>
            <div>
              {memberships && <TeamSlider memberships={memberships} />}
              </div>
          </div>
        </div>
        <TaskList tasksList={tasks} />
      </div>
    </div>
  );
}
