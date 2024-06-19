import React from "react";
import { Outlet } from "react-router-dom";

function LayoutOne() {
  return (
    <div className="relative h-9 ">
      <div className="absolute inset-0 z-10  bg-transparent text-black p-2 ">
        <header className=" flex justify-between">
          <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Fawatiri
          </h1>
        </header>
      </div>

      <div className="relative z-0">
        <Outlet />
      </div>
    </div>
  );
}

export default LayoutOne;
