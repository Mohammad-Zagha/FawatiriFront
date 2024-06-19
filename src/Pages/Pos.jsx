import React, { useEffect, useRef, useState } from "react";
import { catagory } from "../assets/Cat";
import axios from "axios";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelectedData } from "../context/SelectedDataContext";
import warning from "../assets/warning.svg";
import { motion } from "framer-motion";
import { ColorRing, DNA } from "react-loader-spinner";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaCashRegister,
} from "react-icons/fa";

import { Dialog, useMediaQuery } from "@mui/material";
import BottomOfTable from "../components/BottomOfTable";
import PosTable from "../components/PosTable";
import CustomersDialog from "../components/CustomersDialog";

const fetchProducts = async () => {
  const token = Cookies.get("_auth");

  const headers = {
    token: token,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/getProducts",
      { headers }
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    if (error.message.includes("ERR_INTERNET_DISCONNECTED")) {
      console.error("Error fetching products: No internet connection.");
    } else {
      console.error("Error fetching products:", error.message);
    }
  }
};

// Fetch Invoices Function
const fetchInvoices = async () => {
  const token = Cookies.get("_auth");

  const headers = {
    token: token,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/getinvoice",
      { headers }
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    if (error.message.includes("ERR_INTERNET_DISCONNECTED")) {
      console.error("Error fetching invoices: No internet connection.");
    } else {
      console.error("Error fetching invoices:", error.message);
    }
  }
};
const fetchCustomers = async () => {
  const token = Cookies.get("_auth");
  const headers = {
    token: token,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/getCustomers",
      { headers }
    );
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    } else {
      console.error("Unexpected response:", response);
    }
  } catch (error) {
    console.error(error);
  }
};
function Pos() {
  const queryClient = useQueryClient();
  const isNonMobile = useMediaQuery("(min-width:1680px)");
  let [isOpenSalesDialog, setIsOpenSalesDialog] = useState(false);
  const { selectedData } = useSelectedData();
  const [savingLoader, setSavingLoader] = useState(false);
  const [isOpenCustomersDialog, setIsOpenCustomersDialog] = useState(false);
  const [numberOfDalyInvoices, setNumberOfDalyInvoices] = useState(0);
  const [errors, setErrors] = useState({
    savingEmptyError: "",
    deleteInvoiceError: "",
  });
  const [invoice, setInvoice] = useState({
    invoiceNumber: 0,
    customerId: 1,
    products: [],
    name: "-",
    status: "جديد",
    paymentType: "نقدي",
    invoiceDiscount: 0,
    tax: 0,
    totalAmount: 0,
    finalAmount: 0,
  });
  const handleDalyInvoiceIndexDecrease = () => {
    if (numberOfDalyInvoices > 0) {
      setInvoice(invoices?.invoices[numberOfDalyInvoices - 1]);
      setNumberOfDalyInvoices(numberOfDalyInvoices - 1);
    }
  };
  useEffect(() => {
    const productDiscounts = invoice.products.reduce(
      (acc, product) => acc + product.discount,
      0
    );

    const invoiceTotalAmount = invoice.products.reduce(
      (acc, product) => acc + product.price * product.qnt,
      0
    );

    const invoiceFinalAmount =
      invoiceTotalAmount - productDiscounts - invoice.invoiceDiscount;

    setInvoice({
      ...invoice,
      totalAmount: invoiceTotalAmount,
      finalAmount: invoiceFinalAmount,
    });
  }, [invoice.products, invoice.invoiceDiscount]);

  const handleProductDiscountChange = (index, discount) => {
    const updatedProducts = invoice.products.map((product, i) =>
      i === index ? { ...product, discount: Number(discount) } : product
    );

    setInvoice({
      ...invoice,
      products: updatedProducts,
    });
  };

  const handleDalyInvoiceIndexIncrease = () => {
    if (numberOfDalyInvoices < invoices?.invoices.length - 1) {
      setInvoice(invoices?.invoices[numberOfDalyInvoices + 1]);
      setNumberOfDalyInvoices(numberOfDalyInvoices + 1);
    } else {
      setInvoice({
        invoiceNumber: invoices?.lastInvoiceNumber + 1,
        products: [],
        name: "-",
        status: "جديد",
        paymentType: "نقدي",
        invoiceDiscount: 0,
        tax: 0,
        totalAmount: 0,
        finalAmount: 0,
      });
    }
  };
  const handleGoToFirstInvoice = () => {
    if (invoices?.invoices.length > 0) {
      setInvoice(invoices?.invoices[0]);
      setNumberOfDalyInvoices(0);
    }
  };
  const saveInvoice = async () => {
    setSavingLoader(true);

    const token = Cookies.get("_auth");
    const headers = {
      token: token,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/invoice",
        invoice,
        { headers }
      );
      if (response.status === 201) {
        setInvoice({
          invoiceNumber: invoices.lastInvoiceNumber + 1,
          products: [],
          name: "-",
          status: "جديد",
          paymentType: "نقدي",
          invoiceDiscount: 0,
          tax: 0,
          totalAmount: 0,
          finalAmount: 0,
        });
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      if (error.message.includes("ERR_INTERNET_DISCONNECTED")) {
        console.error("Error saving invoice: No internet connection.");
      } else {
        console.error("Error saving invoice:", error.message);
      }
    } finally {
      setSavingLoader(false);
    }
  };
  const handleCustomerSelect = (customerId, customerName) => {
    setInvoice({
      ...invoice,
      paymentType: "ذمم",
      status: "غير مدفوع",
      customerId: customerId,
      name: customerName,
    });
  };
  const {
    status: customersStatus,
    data: customersData,
    error: customersError,
  } = useQuery({
    queryKey: ["customersData"],
    queryFn: () => fetchCustomers(),
  });

  const { status, data, error } = useQuery({
    queryKey: ["productData"],
    queryFn: () => fetchProducts(),
  });
  const {
    status: invoiceStatus,
    data: invoices,
    error: invoicesError,
  } = useQuery({
    queryKey: ["todaysInvoices"],
    queryFn: () => fetchInvoices(),
  });
  const { mutateAsync: addInvoiceMutation } = useMutation({
    mutationFn: saveInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries(["todaysInvoices"]);
    },
  });

  const handleInvoiceSaving = async () => {
    try {
      await addInvoiceMutation();
      console.log(invoice);
    } catch (error) {
      console.log(error);
    }
  };

  function closeSalesDialog() {
    setIsOpenSalesDialog(false);
  }

  const handleContainerChange = (index, containerName) => {
    const newTableArray = [...invoice.products];
    const product = newTableArray[index];
    const selectedContainer = product.productContainers.find(
      (container) => container.name === containerName
    );

    if (selectedContainer) {
      const newBarcode = selectedContainer.barcodes[0]?.code;
      newTableArray[index] = {
        ...product,
        barcode: newBarcode,
        selectedContainerName: selectedContainer.name,
        price: selectedContainer.price,
      };
    }

    setInvoice({ ...invoice, products: newTableArray });
  };
  function openSalesDialog() {
    setIsOpenSalesDialog(true);
  }
  const handleInvoiceDeletion = async () => {
    if (invoice.status == "جديد") {
      console.log("لا يمكن حذف هذه الفاتورة");
      setErrors({
        ...errors,
        deleteInvoiceError: "لا يمكن حذف هذه الفاتورة",
      });
    } else {
      setSavingLoader(true);

      const token = Cookies.get("_auth");
      const headers = {
        token: token,
      };
      try {
        const response = await axios.patch(
          "http://localhost:3000/api/v1/users/cancelSalesInvoice",
          invoice.invoiceNumber,
          { headers }
        );
        if (response.status == 200) {
          queryClient.invalidateQueries(["todaysInvoices"]);
          setSavingLoader(false);
        } else {
          console.log(response);
          setSavingLoader(false);
        }
      } catch (error) {
        setSavingLoader(false);
      }
    }
  };
  useEffect(() => {
    if (selectedData) {
      let isFound = false;
      const updatedResults = invoice.products.map((product) => {
        if (product.barcode === selectedData.barcode) {
          isFound = true;
          return {
            ...product,
            qnt: product.qnt + 1,
          };
        }
        return product;
      });

      if (isFound) {
        setInvoice({ ...invoice, products: updatedResults });
      } else {
        updatedResults.push(selectedData);
        setInvoice({ ...invoice, products: updatedResults });
      }
    }
  }, [selectedData]);

  useEffect(() => {
    setNumberOfDalyInvoices(invoices?.invoices.length);
    setInvoice({ ...invoice, invoiceNumber: invoices?.lastInvoiceNumber + 1 });
  }, [invoices]);
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-fit">
        <motion.div
          className="bg-transparent rounded-r-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col gap-2 p-11">
            <DNA
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        </motion.div>
      </div>
    );
  } else {
    return (
      <div dir="rtl">
        <div className="p-3 w-full h-fit mb-1.5 bg-white shadow-md flex justify-start overflow-x-auto">
          {catagory?.map((cat, index) => (
            <div
              key={index}
              className={`ml-2   ${isNonMobile ? "max-h-10" : "max-h-8"}
              ${isNonMobile ? "h-10" : "h-8"} 
              overflow-hidden min-h-15 text-center p-2 w-fit min-w-32 flex justify-center cursor-pointer rounded-lg`}
              style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
            >
              <h1 className="text-gray-700 text-sm font-bold ">
                {cat.catName}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex bg-white gap-1 min-h-[750px] overflow-y-auto justify-between m-4">
          <div className="flex flex-col gap-2 max-h-[750px] p-2 pt-7  m-1">
            <div
              onClick={() => {
                setInvoice({
                  invoiceNumber: invoices?.lastInvoiceNumber + 1,
                  products: [],
                  name: "-",
                  status: "جديد",
                  paymentType: "نقدي",
                  invoiceDiscount: 0,
                  tax: 0,
                  totalAmount: 0,
                  finalAmount: 0,
                });
                setNumberOfDalyInvoices(invoices?.invoices.length);
                setErrors({
                  savingEmptyError: "",
                  deleteInvoiceError: "",
                });
              }}
              className="h-12 min-h-16 bg-gray-800  text-center p-1  w-24 overflow-hidden  cursor-pointer rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <h1 className="text-white text-md font-semibold mt-4">جديد</h1>
            </div>
            <div
              onClick={async () => {
                console.log(invoice);
                if (invoice.products.length == 0) {
                  setErrors({ ...errors, savingEmptyError: "يجب اضافة اصناف" });
                  return;
                } else {
                  if (invoice.paymentType != "ذمم") {
                    await setInvoice({ ...invoice, status: "مدفوع" });
                    handleInvoiceSaving();
                  } else {
                    handleInvoiceSaving();
                  }

                  setErrors({
                    ...errors,
                    savingEmptyError: "",
                    deleteInvoiceError: "",
                  });
                }
              }}
              className="h-12 min-h-16 bg-gray-800  text-center p-1  w-24 overflow-hidden  cursor-pointer rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <h1 className="text-white text-md font-semibold mt-4">حفظ</h1>
            </div>
            <div
              onClick={() => handleInvoiceDeletion()}
              className="h-12 min-h-16 bg-gray-800  text-center p-1  w-24 overflow-hidden  cursor-pointer rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <h1 className="text-white text-md font-semibold mt-4">حذف</h1>
            </div>
            <div
              className="h-12 min-h-16 bg-gray-800  text-center p-1  w-24 overflow-hidden  cursor-pointer rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <h1 className="text-white text-md font-semibold mt-4">
                فتح الصندوق
              </h1>
            </div>
            <div
              className="h-12 min-h-16 bg-gray-800  text-center p-1  w-24 overflow-hidden  cursor-pointer rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <h1 className="text-white text-md font-semibold mt-4">طباعة</h1>
            </div>
            <div
              className="h-12 min-h-16 bg-gray-800  text-center p-1  w-24 overflow-hidden  cursor-pointer rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <h1 className="text-white text-md font-semibold mt-4">تعليق</h1>
            </div>
            <div
              className="h-12 min-h-16 bg-gray-800  text-center p-1  w-24 overflow-hidden  cursor-pointer rounded-lg"
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
              }}
            >
              <h1 className="text-white text-md font-semibold mt-4">
                فوتير معلقة
              </h1>
            </div>
          </div>
          <div
            className={`grid   gap-3 p-4 ${
              isNonMobile ? "w-96" : "w-72"
            } max-h-[750px] overflow-x-auto ${
              isNonMobile ? "grid-cols-3" : "grid-cols-2"
            }`}
            dir="rtl"
          >
            {catagory?.map((cat, index) => (
              <div
                key={index}
                className="col-span-1  h-32 min-h-16  text-center  p-1  w-24 overflow-hidden flex justify-center  cursor-pointer rounded-lg"
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                }}
              >
                <h1 className="text-gray-700 text-lg font-bold mt-3 ml-3">
                  {cat.catName}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex-1 flex-col min-h-[750px] p-2 rounded-md">
            <div
              className="flex-col flex-1 min-h-[600px]  overflow-y-auto"
              dir="rtl"
            >
              <div className="flex p-1 gap-1">
                {" "}
                {/*Buttons*/}
                <button
                  onClick={() => {
                    handleGoToFirstInvoice();
                  }}
                  className="flex items-center justify-center bg-blue-500 w-16 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  <FaAngleDoubleRight size={20} />
                </button>
                <button
                  onClick={() => handleDalyInvoiceIndexDecrease()}
                  className="flex items-center justify-center bg-blue-500 w-16 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  <FaAngleRight size={20} />
                </button>
                <button
                  onClick={() => handleDalyInvoiceIndexIncrease()}
                  className="flex items-center justify-center bg-blue-500 w-16 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                >
                  <FaAngleLeft size={20} />
                </button>
                <button className="flex items-center justify-center bg-blue-500 w-16 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                  <FaAngleDoubleLeft size={20} />
                </button>
                <div
                  onClick={() => {
                    setIsOpenCustomersDialog(true);
                  }}
                  style={{
                    boxShadow:
                      "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
                  }}
                  className={`h-7 mr-4 rounded-lg w-36  flex justify-center cursor-pointer text-center font-bold ${
                    invoice.paymentType == "نقدي"
                      ? "bg-blue-200"
                      : invoice.paymentType == "ذمم"
                      ? "bg-yellow-500"
                      : "bg-blue-200"
                  } text-black `}
                >
                  {invoice.paymentType}
                </div>
                <ColorRing
                  visible={savingLoader}
                  height="28"
                  width="30"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
                {errors.savingEmptyError != "" && (
                  <motion.div
                    className="bg-transparent rounded-r-lg flex"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={warning} className="h-7 w-7" />
                    <h1 className="text-red-600 font-semibold mr-2">
                      {errors.savingEmptyError}
                    </h1>
                  </motion.div>
                )}
                {errors.deleteInvoiceError != "" && (
                  <motion.div
                    className="bg-transparent rounded-r-lg flex"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <img src={warning} className="h-7 w-7" />
                    <h1 className="text-red-600 font-semibold mr-2">
                      {errors.deleteInvoiceError}
                    </h1>
                  </motion.div>
                )}
              </div>
              <div className="max-h-[550px] overflow-y-scroll">
                {/*Table*/}
                <PosTable
                  invoice={invoice}
                  handleContainerChange={handleContainerChange}
                  handleProductDiscountChange={handleProductDiscountChange}
                />
              </div>
            </div>
            <div className="mt-1 text-white px-5 rounded-lg" dir="rtl">
              {/*Buttom Of Table*/}
              <BottomOfTable
                invoice={invoice}
                openSalesDialog={openSalesDialog}
                setInvoice={setInvoice}
              />
            </div>
          </div>
        </div>

        <Dialog
          fullWidth={true}
          maxWidth={"xl"}
          open={isOpenSalesDialog}
          onClose={closeSalesDialog}
        >
          <div
            className="flex-col justify-center items-center text-center p-5"
            dir="rtl"
          >
            <h1 className="font-bold text-4xl text-gray-600 m-5">
              مبيعات اليوم
            </h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[calc(15*48px)] overflow-y-auto">
              <table className="w-full text-sm text-left rtl:text-right ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-200 ">
                  <tr className="">
                    <th scope="col" className="px-6 py-3">
                      الرقم
                    </th>
                    <th scope="col" className="px-6 py-3">
                      الاسم
                    </th>
                    <th scope="col" className="px-6 py-3">
                      المبلغ
                    </th>
                    <th scope="col" className="px-6 py-3">
                      خصم الفاتورة
                    </th>
                    <th scope="col" className="px-6 py-3">
                      خصم الاصناف
                    </th>
                    <th scope="col" className="px-6 py-3">
                      الحالة
                    </th>
                    <th scope="col" className="px-6 py-3">
                      نوع الدفع
                    </th>
                  </tr>
                </thead>
                <tbody className="font-bold text-xl ">
                  {invoices.invoices?.map((invoice, index) => (
                    <tr
                      className="bg-white border-b  hover:bg-gray-200 "
                      key={index}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-semibold text-gray-900 whitespace-nowrap "
                      >
                        {invoice.invoiceNumber}
                      </th>
                      <td className="px-6 py-4 ">{invoice.name}</td>
                      <td className="px-6 py-4">
                        {parseFloat(invoice.finalAmount)}
                      </td>
                      <td className="px-6 py-4">
                        {parseFloat(invoice.invoiceDiscount)}
                      </td>
                      <td className="px-6 py-4">
                        {parseFloat(
                          invoice.products.reduce(
                            (acc, product) => acc + product.discount,
                            0
                          )
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div
                          className={`rounded-lg ${
                            invoice.status == "مدفوع"
                              ? "bg-green-500"
                              : invoice.status == "ملغي"
                              ? "bg-red-500"
                              : "bg-yellow-500"
                          } text-white w-2/4  text-center px-5 py-1`}
                        >
                          <h1 className="mb-1">{invoice.status}</h1>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex gap-5">
                        <h1>{invoice.paymentType}</h1>
                        <div className="mt-1">
                          <FaCashRegister />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-200 h-fit w-full font-bold text-xl p-5  mt-2">
              <div className="w-1/3 h-fit grid grid-cols-2  p-2 gap-3">
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>مجموع</h1>
                </div>
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>150.00</h1>
                </div>
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>ذمم</h1>
                </div>
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>5.00</h1>
                </div>
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>بطاقة</h1>
                </div>
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>40.50</h1>
                </div>
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>نقدي</h1>
                </div>
                <div className="col-span-1 border-b-2 border-gray-400 p-2">
                  <h1>10.00</h1>
                </div>
              </div>
            </div>
          </div>
        </Dialog>
        <CustomersDialog
          customersData={customersData}
          isOpenCustomersDialog={isOpenCustomersDialog}
          handleCustomerSelect={handleCustomerSelect}
          setIsOpenCustomersDialog={setIsOpenCustomersDialog}
        />
      </div>
    );
  }
}

export default Pos;
