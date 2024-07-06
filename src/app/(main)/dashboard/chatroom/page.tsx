import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { getMainTasks } from "@/Service/Notty-API/getMainTasks";
import { getMembershipByUserId } from "@/Service/Notty-API/Teams/getMembershipByUserId";

// Dynamically import ChatRoom with SSR disabled
const ChatRoom = dynamic(() => import("@/modules/TeamComponents/ChatRoom/ChatRoom"), { ssr: false });

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("idUser");
  const token = cookieStore.get("token");

  if (userId == undefined && token == undefined) {
    redirect("/login");
  }
  const id = userId as any;
  const tasks = await getMainTasks(parseInt(id.value));
  const memberships = await getMembershipByUserId(parseInt(id.value))

  return (
    <div className="h-lvh flex flex-col gap-5">
      <ChatRoom />
    </div>
  );
}
