import React from "react";
import { IoIosArrowDown } from "react-icons/io"; // Ensure this import is correct
import { Outlet } from "react-router-dom";

const NavBar = () => {
  
  return (
    <div>
      <nav dir="rtl" className="flex justify-between p-4 bg-white">
        <div className="flex h-12 w-40 rounded-[12px] outline-1 mr-3">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white mt-1"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
          />
          <h2 className="mt-2 mr-3">محلات ميلان</h2>
          <IoIosArrowDown className="mt-4 mr-2" />
        </div>
        <div className="flex p-2 justify-evenly gap-6">
          <a href="#">الرئيسية</a>
          <a href="#">اضافة صنف</a>
          <a href="#">فاتورة مشتريات</a>
          <a href="#">فواتير المشتريات</a>
        </div>
        <div>
          <h2 className="text-xl">Fawatiri</h2>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default NavBar;
