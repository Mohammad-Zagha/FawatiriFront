import React from "react";
// Ensure this import is correct
import { IoIosArrowDown } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { LuNewspaper } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdOutlineCreditScore } from "react-icons/md";
import { FaCashRegister } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
const SideBar = () => {
  return (
    <div className="flex flex-col p-5 bg-white m-5 rounded-[36px] gap-4 h-lvh mt-2">
      <a href="#" className="text-lg text-slate-500 font-sans font-bold flex">
        <MdOutlineSpaceDashboard className="mt-1 ml-2 h-6 w-6" />
        لوحة القيادة
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <TbFileInvoice className="mt-1 ml-2 h-6 w-6" />
        فواتير المشتريات
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <LiaFileInvoiceDollarSolid className="mt-1 ml-2 h-6 w-6" />
        فواتير المبيعات
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <LuNewspaper className="mt-1 ml-2 h-6 w-6" />
        السندات
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <TbReportAnalytics className="mt-1 ml-2 h-6 w-6" />
        التقارير
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <MdOutlineInventory2 className="mt-1 ml-2 h-6 w-6" />
        المخزون
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <MdOutlineCreditScore className="mt-1 ml-2 h-6 w-6" />
        ارصدة العملاء
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <FaCashRegister className="mt-1 ml-2 h-6 w-6" />
        ارصدة الصناديق
      </a>
      <a
        href="#"
        className="text-lg text-slate-500 font-sans font-bold flex mt-5"
      >
        <BsBank className="mt-1 ml-2 h-6 w-6" />
        البنوك
      </a>
    </div>
  );
};

export default SideBar;
