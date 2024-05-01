'use client'
import React, { useState } from "react";

export default function Header() {
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const IconMenu = () => {
    return (
      <div className="md:hidden p-5">
        <button className="relative group " onClick={toggleMenu}>
        </button>
      </div>
    );
  };
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="bg-gray-800 text-white mb-5  z-30 w-full">
      <div className=" flex justify-between items-center ">
        <div>
          <h1 className="text-2xl font-semibold p-5">Notty</h1>
        </div>
        <nav className="hidden md:block p-5">
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="hover:text-green-300 transition">
                Inicio
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-300 transition">
                Acerca de
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-300 transition">
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#"
                className=" bg-green-500 hover:text-green-500 hover:bg-gray-800 hover:border-green-500  border-2 border-gray-800  transition duration-1000 p-2 rounded-lg"
              >
                Contacto
              </a>
            </li>
          </ul>
        </nav>
        <IconMenu></IconMenu>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden">
          <ul className="">
            <li className="hover:bg-green-700 transition p-4">
              <a href="#" className="hover:text-gray-300">
                Inicio
              </a>
            </li>
            <li className="hover:bg-green-700 transition p-4">
              <a href="#" className="hover:text-gray-300">
                Acerca de
              </a>
            </li>
            <li className="hover:bg-green-700 transition p-4">
              <a href="#" className="hover:text-gray-300">
                Servicios
              </a>
            </li>
            <li className="hover:bg-green-700 transition p-4">
              <a href="#" className="hover:text-gray-300 ">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
