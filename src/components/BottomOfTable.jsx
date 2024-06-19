import React from "react";
import { IoDocumentsOutline } from "react-icons/io5";

function BottomOfTable({ invoice, setInvoice, openSalesDialog }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2  text-white p-2 rounded-lg"
      dir="rtl"
    >
      <div className="col-span-1 max-h-32 bg-gray-800 p-2 rounded-lg  sm:h-32 lg:h-48">
        <label htmlFor="total" className="block mb-1 text-right text-sm">
          الإجمالي
        </label>
        <input
          type="text"
          id="total"
          className="w-full p-1 rounded bg-gray-900 text-white text-sm"
          value={invoice.products.reduce(
            (total, product) => total + product.price * product.qnt,
            0
          )}
          readOnly
        />
        <label htmlFor="total" className="block mb-1 mt-1 text-right text-sm">
          عدد الاصناف
        </label>
        <input
          type="text"
          id="numberOfItems"
          className="w-full p-1 rounded bg-gray-900 text-white text-sm"
          value={invoice.products.reduce(
            (total, product) => total + product.qnt,
            0
          )}
          readOnly
        />
      </div>

      <div className="col-span-1 max-h-32  gap-2 bg-gray-800 rounded-lg p-2 h-auto sm:h-32 lg:h-48">
        <div className="flex gap-2">
          <div>
            <label htmlFor="discount" className="block mb-1 text-right text-sm">
              خصم الاصناف
            </label>
            <input
              type="text"
              id="discount"
              className="w-full p-1 rounded bg-gray-900 text-white text-sm"
              value={invoice.products.reduce(
                (total, product) => total + product.discount,
                0
              )}
              readOnly
            />
          </div>

          <div>
            <label htmlFor="discount" className="block mb-1 text-right text-sm">
              خصم الفاتورة
            </label>
            <input
              type="text"
              id="discount"
              className="w-full p-1 rounded bg-gray-900 text-white text-sm"
              value={invoice.invoiceDiscount}
              onChange={(e) =>
                setInvoice({
                  ...invoice,
                  invoiceDiscount: Number(e.target.value),
                })
              }
            />
          </div>
        </div>

        <label htmlFor="discount" className="block mb-1 text-right text-sm">
          % مجموع الخصومات
        </label>
        <input
          type="text"
          id="discount"
          className="w-full p-1 rounded bg-gray-900 text-white text-sm"
          value={
            invoice.totalAmount > 0
              ? parseFloat(
                  (
                    ((invoice.totalAmount - invoice.finalAmount) /
                      invoice.totalAmount) *
                    100
                  ).toFixed(3)
                )
              : 0 // Or any other default value when totalAmount is zero
          }
          readOnly
        />
      </div>

      <div className="col-span-1 p-2 max-h-32 bg-gray-800 rounded-lg  sm:h-32 lg:h-48">
        <div className="flex gap-2 bg-gray-800 justify-between">
          <label
            htmlFor="discount"
            className="block mb-1 mt-2 font-bold text-right text-sm"
          >
            رقم الفاتورة
          </label>
          <input
            type="text"
            id="discount"
            className="w-2/4 mt-1 p-1 text-center bg-gray-900 text-white rounded-lg font-bold text-lg pr-2"
            value={invoice.invoiceNumber}
            readOnly
          />
          <button
            onClick={openSalesDialog}
            className="flex items-center h-8 justify-center bg-gray-600 min-w-12 mt-1 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
          >
            <IoDocumentsOutline size={16} />
          </button>
        </div>
        <div className="flex gap-2 bg-gray-800 mt-2 justify-between">
          <label
            htmlFor="discount"
            className="block mb-1 mt-1 font-bold text-right text-sm"
          >
            الحالة
          </label>
          <input
            type="text"
            id="discount"
            className={`w-2/3 p-1 ${
              invoice.status == "جديد"
                ? "bg-green-500"
                : invoice.status == "غير مدفوع"
                ? "bg-yellow-500"
                : invoice.status == "مدفوع"
                ? "bg-green-500"
                : invoice.status == "ملغي"
                ? "bg-red-500"
                : "bg-green-500"
            } text-white rounded-lg font-bold text-lg text-center`}
            value={invoice.status}
            readOnly
          />
        </div>
      </div>

      <div className="col-span-1 ">
        <div
          id="net-total"
          className="w-full max-h-32 bg-gray-800  p-1 rounded-lg text-center h-auto sm:h-32 lg:h-48 text-white flex items-center justify-center"
        >
          <div>
            <h1 className="text-4xl">{invoice.finalAmount}</h1>
            <span className="text-gray-500 text-xl">المبلغ المطلوب</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BottomOfTable;
