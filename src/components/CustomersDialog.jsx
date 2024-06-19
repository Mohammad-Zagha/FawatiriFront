import { Dialog } from "@mui/material";
import React from "react";

function CustomersDialog({
  isOpenCustomersDialog,
  setIsOpenCustomersDialog,
  handleCustomerSelect,
  customersData,
}) {
  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={isOpenCustomersDialog}
      onClose={() => {
        setIsOpenCustomersDialog(false);
      }}
    >
      <div className="flex flex-col gap-2 justify-center items-center">
        <h1 className="mb-4 text-xl font-semibold leading-none tracking-tight text-gray-600 md:text-5xl lg:text-4xl">
          العملاء
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
          اختر احد العملاء لفاتورة ذمم
        </p>
        <div
          className="relative overflow-x-auto shadow-md sm:rounded-lg m-4 w-full"
          dir="rtl"
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  الرقم
                </th>
                <th scope="col" className="px-6 py-3">
                  الاسم
                </th>
                <th scope="col" className="px-6 py-3">
                  العنوان
                </th>
                <th scope="col" className="px-6 py-3">
                  الهاتف
                </th>
                <th scope="col" className="px-6 py-3">
                  الملاحظات
                </th>
              </tr>
            </thead>
            <tbody>
              {customersData?.map((customer, index) => (
                <tr
                  className="bg-white border-b "
                  key={index}
                  onClick={() => {
                    handleCustomerSelect(customer._id, customer.name);
                    setIsOpenCustomersDialog(false);
                  }}
                >
                  <td className="px-6 py-4">{index}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {customer.name}
                  </th>

                  <td className="px-6 py-4"> {customer.location} </td>
                  <td className="px-6 py-4"> {customer.phone}</td>
                  <td className="px-6 py-4 text-right">{customer.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dialog>
  );
}

export default CustomersDialog;
