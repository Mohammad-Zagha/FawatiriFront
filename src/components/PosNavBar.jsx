import React, { useState, useMemo } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import jawalLogo from "../assets/Jawal32x32.png";
import OreedoLogo from "../assets/OredooLogo.png";
import Cookies from "js-cookie";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSelectedData } from "../context/SelectedDataContext";

const fetchProducts = async () => {
  const token = Cookies.get("_auth");
  const headers = {
    token: token,
  };
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/users/getProducts",
      {
        headers,
      }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      console.log(response);
    }
  } catch (error) {
    console.log(error);
  }
};

function PosNavBar() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { status, data, error } = useQuery({
    queryKey: ["productData"],
    queryFn: fetchProducts,
  });
  const { handleDataSelect } = useSelectedData();

  const handleSelectData = (selectedData) => {
    handleDataSelect(selectedData);
    setSearch("");
    setDebouncedSearch("");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    debouncedSearchChange(e.target.value);
  };

  const debouncedSearchChange = useMemo(
    () => debounce((value) => setDebouncedSearch(value), 200),
    []
  );

  let filteredProducts = data?.filter((product) => {
    const searchLower = debouncedSearch.toLowerCase();
    const isBarcodeInContainers = product.containers?.some((container) =>
      container.barcodes?.some((barcode) => barcode.code.includes(searchLower))
    );

    return (
      product.itemName?.toLowerCase().includes(searchLower) ||
      product.itemNumber?.toString().includes(searchLower) ||
      product.mainBarcode?.includes(searchLower) ||
      isBarcodeInContainers
    );
  });
  const handleBarcodeSearch = (barcode) => {
    data?.forEach((product) => {
      if (product.mainBarcode == barcode) {
        handleSelectData({
          itemNumber: product.itemNumber,
          currentStock: product.currentStock,
          barcode,
          discount: 0,
          itemName: product.itemName,
          productContainers: product.containers,
          selectedContainerName: product.containers[0].name,
          price: product.containers[0].price,
          qnt: 1,
          _id: product._id,
        });
        return;
      } else {
        product.containers.forEach((container, containerIndex) => {
          if (
            container.barcodes.some(
              (barcodeItem) => barcodeItem.code === barcode
            )
          ) {
            handleSelectData({
              itemNumber: product.itemNumber,
              currentStock: product.currentStock,
              barcode,
              discount: 0,
              itemName: product.itemName,
              productContainers: product.containers,
              selectedContainerName: container.name,
              price: container.price,
              qnt: 1,
              _id: product._id,
            });
            return;
          }
        });
      }
    });
  };
  const handleTextFieldKeyPress = (event) => {
    if (event.key === "Enter") {
      handleBarcodeSearch(search);
      setTimeout(() => {
        setSearch("");
        setDebouncedSearch("");
      }, 200);
    }
  };

  return (
    <div className="">
      <nav dir="rtl" className="flex justify-between p-4 shadow-md bg-white">
        <div className="flex h-12 w-fit rounded-[12px] outline-1 mr-3">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white mt-1"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
          />
          <h2 className="mt-2 mr-3"> محلات ميلان </h2>
          <h2 className="mt-2 mr-3 text-gray-600"> (الشفت الصباحي) </h2>
          <IoIosArrowDown className="mt-4 mr-2" />
        </div>
        <div className="max-w-md mx-auto relative">
          <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-24 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              className="peer h-full min-w-96 outline-none text-sm text-gray-700 pr-2"
              type="text"
              value={search}
              onKeyDown={handleTextFieldKeyPress}
              onChange={handleSearchChange}
              id="search"
              placeholder="ابحث عن صنف . . ."
            />
          </div>
          {debouncedSearch && filteredProducts?.length > 0 && (
            <div className="bg-gray-200 max-h-80 min-w-96  absolute rounded-lg mt-2 overflow-y-auto z-10">
              <table className="table-auto w-full shadow-md rounded-lg">
                <thead className="bg-gray-400 text-white">
                  <tr>
                    <th className="px-4 py-2 text-start">رقم الصنف</th>
                    <th className="px-4 py-2 text-start">اسم الصنف</th>
                    <th className="px-4 py-2 text-start">سعر البيع</th>
                    <th className="px-4 py-2 text-start">الكمية</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts?.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b"
                      onClick={() => handleBarcodeSearch(product.mainBarcode)}
                    >
                      <td className="px-4 py-2">{product.itemNumber}</td>
                      <td className="px-4 py-2">{product.itemName}</td>
                      <td className="px-4 py-2">
                        {product.containers[0]?.price}
                      </td>
                      <td className="px-4 py-2">{product.currentStock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <div
          className="ml-5 h-11   p-1 w-32  flex justify-center  cursor-pointer rounded-lg"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={() => window.open("https://mersal.ps/", "_blank")}
        >
          <h1 className="text-gray-700 text-md font-bold mt-1 ml-3">
            {" "}
            رصيد جوال{" "}
          </h1>
          <img
            className="mt-2"
            src={jawalLogo}
            alt="JawalLogo"
            style={{
              height: "25px",
            }}
          />
        </div>
        <div
          className="ml-5 h-11   p-1 w-32 flex justify-center  cursor-pointer rounded-lg"
          style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          onClick={() => window.open("https://b1.linkpay.ps/", "_blank")}
        >
          <h1 className="text-gray-700 text-md font-bold mt-1 ml-3">
            {" "}
            رصيد اوريدو{" "}
          </h1>
          <img
            className="mt-2"
            src={OreedoLogo}
            alt="JawalLogo"
            style={{
              height: "25px",
            }}
          />
        </div>
        <div>
          <h2 className="text-xl mt-4 text-gray-800 font-mono font-bold">
            Fawatiri
          </h2>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default PosNavBar;
