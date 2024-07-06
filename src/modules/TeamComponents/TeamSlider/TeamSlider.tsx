"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TeamCard } from "../TeamCard";
import { TeamMembership } from "@/Dto/TeamMembership";
import Link from "next/link";

interface TeamSliderProps {
  memberships: TeamMembership[];
}
export default function TeamSlider(props: TeamSliderProps) {
  const { memberships } = props;

  if (memberships.length === 0) {
    return (
      <div>
        <h1>You dont have groups</h1>
      </div>
    );
  }

  return (
    <div className="w-full  flex gap-2 flex-col mx-auto overflow-visible   ">
      {memberships.map((membership) => (
        <Link
          key={membership.id}
          href={`dashboard/team/id?id=${membership.id}&teamId=${membership.team.idTeam}`}
        >
          <div className="flex-col justify-center items-center hover:bg-slate-100 ease-out transition">
            <TeamCard membership={membership} />
          </div>
        </Link>
      ))}
    </div>
  );
}
