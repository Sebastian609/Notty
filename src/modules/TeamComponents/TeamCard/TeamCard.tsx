import { Team } from "@/Dto/Team";
import { TeamMembership } from "@/Dto/TeamMembership";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/Service/Cookies/cookies";
import { Task } from "@/Dto/Task";

interface TeamCardProps {
  membership: TeamMembership;
}

export default function TeamCard(props: TeamCardProps) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const saveUserData = () => {
      const name = getCookie("name");
      if (name == undefined) {
        return;
      }
      setUserName(name);
    };

    saveUserData();
  }, []);

  const { membership } = props;
  const router = useRouter();
  const team: Team = membership.team;
  const tasks: Task[] = membership.teamTasks;
  const pendingTasks = tasks.filter(
    (task: Task) => task.taskStatus === "IN_PROGRESS"
  );

  

  return (
    <div className="w-full flex flex-row border-2 p-4 rounded-xl justify-between items-center">
      <div className="flex flex-row gap-6">
        <div className=" mx-0 my-auto py-1 w-auto px-3 text-white bg-blue-500 text-center rounded-full">
          {team.name}
        </div>

        {pendingTasks.length > 0 && (
          <p className="text-center bg-yellow-500 p-2 rounded-full text-white animate-pulse animate-infinite animate-duration-[1220ms]">
            {pendingTasks.length} pending Tasks
          </p>
        )}

        {membership.isLeader && (
          <div className="text-center my-2 text-slate-400">
            (You are the leader)
          </div>
        )}
      </div>
      
    </div>
  );
}
