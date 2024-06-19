import React from "react";
import CashBoxDisplay from "../components/chashBoxDisplay";
import StoreSelectCart from "../components/StoreSelectCart";

function SelectAccount() {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
        Fawatiri
      </h1>

      <div className="flex justify-center items-center h-screen w-screen">
        <div className="flex flex-col justify-center text-center h-fit gap-2">
          <h1 className="text-4xl text-gray-800 font-bold">
            الرجاء اختيار المحل{" "}
          </h1>
          <h1 className="text-xl font-semibold text-gray-600">
            بعد اختيارك للمحل الرجاء اختيار شيفت العمل
          </h1>
          <div className=" mt-4 p-5 min-h-[400px] min-w-[750px] ">
            <div className="rounded-lg flex justify-between min-h-[400px] w-fit  gap-3 overflow-hidden p-8">
              <StoreSelectCart />
              <StoreSelectCart />
              <StoreSelectCart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectAccount;
