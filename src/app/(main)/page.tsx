

import React, { Suspense } from "react";
import { TaskList } from "../modules/TaskComponents/TaskList";
import { HeaderMain } from "../modules/HeaderMain";
import { Combobox } from "../modules/ui/Combobox";
export default function MainPage() {
  return (
    <div className="h-lvh flex flex-col gap-5">
      <div className=" h-16 border-b-slate-200 flex justify-start items-center pl-5 border-2">
      <HeaderMain />
      </div>
      <div className="flex pag-4 overflow-hidden flex-row gap-4 mx-4">
        <div className=" border-slate-100 border-2 w-3/4 rounded-lg"></div>
        <Suspense  fallback={<div>Cargando...</div>}>
      
          <TaskList />
        </Suspense>
      </div>
    </div>
  );
}
