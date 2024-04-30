import Head from "next/head";

import React, {useState } from "react";
import { TaskList } from "../modules/TaskComponents/TaskList";
export default function MainPage() {
  

  return (
      <div className="h-svh">
        <TaskList/>
      </div>
  );
}
