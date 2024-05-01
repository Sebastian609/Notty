import Head from "next/head";

import React, { useState } from "react";
import { TaskList } from "../modules/TaskComponents/TaskList";
import { Header } from "../modules/Header";
import { Login } from "../modules/Login";
export default function MainPage() {
  return (
    <div className="h-lvh flex flex-col">
      <Header />
      <div className="flex h-full overflow-hidden flex-row gap-4 mx-4">
        <div className="border-2 w-3/4 rounded-lg"></div>
        <TaskList />
        <Login />  
      </div>
    </div>
  );
}
