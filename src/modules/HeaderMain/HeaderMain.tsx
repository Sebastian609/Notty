'use client'
import React from "react";
import { Alert } from "../ui/Alert";

export default function HeaderMain():JSX.Element {

  return (
    <header className="flex flex-row justify-between items-center h-16 w-full border-b-2 py-5 px-5">
      <h1 className="font-bold text-xl">Notty</h1>
      <div className="p-2 rounded-lg  hover:border-red-600 border-2 text-gray-500 hover:text-red-600 transition">
      <Alert
                action="Log Out"
                description="Doy you really want to log out?"
                tittle="¿Are you sure?"
                accept="yes"
                onAccept={()=>console.log("")}
                cancel="stay here"
              />
      </div>
    </header>
  );
}
