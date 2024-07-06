import React from "react";
import { HeaderMain } from "@/modules/HeaderMain";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMembershipById } from "@/Service/Notty-API/Teams/getMembershipById";
import { getCookie } from "@/Service/Cookies/cookies";
import Link from "next/link";
import { TaskCreator } from "@/modules/TaskComponents/TaskCreator";
import { TaskList } from "@/modules/TaskComponents/TaskList";
import { Task } from "@/Dto/Task";

interface TeamPageProps {
  searchParams: {
    id: number;
    teamId: number;
  };
}

export default async function Page(props: TeamPageProps) {
  const { searchParams } = props;
  const cookieStore = cookies();
  const userId = cookieStore.get("idUser");
  const token = cookieStore.get("token");

  if (userId?.value == undefined && token?.value == undefined) {
    redirect("/login");
    return;
  }
  const name = getCookie("name");

  const id = userId as any;
  if (id === undefined) {
    redirect("/login");
  }

  const membership = await getMembershipById(searchParams.id);

  return (
    <div className="h-screen flex flex-col gap-5">
      <HeaderMain />

      <div className="flex pag-4 overflow-hidden h-full flex-row gap-4 mx-5 mb-5">
        <div className="border-slate-100 flex flex-col items-center h-full w-3/4 mb-5">
          <div className="w-full h-1/6">
            <TaskCreator />
          </div>
          <div className="border-2 w-full h-4/6 overflow-y-scroll py-4 flex-col justify-between  gap-8 my-4 px-4 rounded-2xl">
            <h3 className="font-bold text-2xl mb-4">{membership?.team.name}</h3>
          </div>
          <Link
            href={`/dashboard/chatroom`}
            className="bg-emerald-500 p-2 w-full text-center text-white overflow-hidden mt-auto rounded-lg"
          >
            Go To Chatroom
          </Link>
        </div>

        {membership && <TaskList tasksList={membership?.teamTasks} />}

       
      </div>
      <div className="w-1/4 pr-4 animate-jump-in animate-once overflow-y-scroll flex flex-col gap-4 items-center"></div>
    </div>
  );
}
