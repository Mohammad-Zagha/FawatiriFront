import { MenuItem, Select } from "@mui/material";
import React from "react";
import { BsTrash } from "react-icons/bs";
import { MdExposurePlus1 } from "react-icons/md";
import { RiArrowGoBackFill } from "react-icons/ri";
import { TbExposureMinus1 } from "react-icons/tb";
import { motion } from "framer-motion";
function PosTable({
  invoice,
  handleContainerChange,
  handleProductDiscountChange,
}) {
  return (
    <table
      className="table-auto text-gray-400 border-separate text-xs w-full"
      style={{ borderSpacing: "0 10px" }}
    >
      <thead className="bg-gray-800 text-gray-500">
        <tr>
          <th className="p-2 border-l border-gray-600 rounded-r-lg">#</th>
          <th className="p-2 text-right border-l border-gray-600 w-32">
            اسم المادة
          </th>
          <th className="p-2 text-right border-l border-gray-600">الوحدة</th>
          <th className="p-2 text-right border-l border-gray-600">الكمية</th>
          <th className="p-2 text-right border-l border-gray-600">بونص</th>
          <th className="p-2 text-right border-l border-gray-600">السعر</th>
          <th className="p-2 text-right border-l border-gray-600">الخصم</th>
          <th className="p-2 text-right border-l border-gray-600">المجموع</th>
          <th className="p-2 text-right border-l border-gray-600 rounded-l-lg">
            خصائص
          </th>
        </tr>
      </thead>
      <tbody>
        {invoice.products.length > 0 ? (
          invoice.products.map((product, index) => (
            <motion.tr
              className="bg-gray-800 rounded-lg h-8"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
            >
              <td className="p-2 border-l border-gray-600 rounded-r-lg">
                <span className="text-white">{product.itemNumber}</span>
              </td>
              <td className="p-2 text-white border-l border-gray-600">
                {product.itemName}
              </td>
              <td className="p-2 border-l border-gray-600">
                <Select
                  labelId={`container-select-label-${index}`}
                  id={`container-select-${index}`}
                  value={product.selectedContainerName}
                  onChange={(e) => handleContainerChange(index, e.target.value)}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    height: "25px",
                    width: "full",
                    ".MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": {
                        borderColor: "white",
                      },
                    },
                    ".MuiSvgIcon-root": {
                      fill: "white !important",
                    },
                  }}
                >
                  {product.productContainers?.map((container, cindex) => (
                    <MenuItem
                      key={cindex}
                      value={container.name}
                      className="text-gray-800 font-medium"
                    >
                      {container.name}
                    </MenuItem>
                  ))}
                </Select>
              </td>
              <td className="p-2 text-center text-white border-l border-gray-600">
                {product.qnt}
              </td>
              <td className="p-2 text-center text-white border-l border-gray-600">
                0
              </td>
              <td className="p-2 text-center text-white border-l border-gray-600">
                {product.price}
              </td>
              <td className="p-2 text-center text-white border-l border-gray-600">
                <input
                  type="number"
                  id="number-input"
                  aria-describedby="helper-text-explanation"
                  className="  focus:border-transparent bg-transparent border-transparent outline-transparent foucs:outline-transparent h-7  text-white text-sm rounded-lg  block w-14 p-2.5   dark:placeholder-gray-400  no-arrows"
                  placeholder="0"
                  step="any"
                  onChange={(e) =>
                    handleProductDiscountChange(index, e.target.value)
                  }
                />
              </td>
              <td className="p-2 text-center text-white border-l border-gray-600">
                {product.price * product.qnt - product.discount}
              </td>
              <td className="p-2 border-l max-w-fit border-gray-600 rounded-l-lg flex justify-center">
                <div className="flex gap-1 justify-center">
                  <button className="flex items-center justify-center bg-red-500 min-w-16 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    <BsTrash size={16} />
                  </button>
                  <button className="flex items-center justify-center bg-yellow-500 min-w-16 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded">
                    <RiArrowGoBackFill size={16} />
                  </button>
                  <button className="flex items-center justify-center bg-red-500 min-w-16 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
                    <TbExposureMinus1 size={16} />
                  </button>
                  <button className="flex items-center justify-center bg-green-500 min-w-16 hover:bg-green-700 text-white font-bold py-1 px-2 rounded">
                    <MdExposurePlus1 size={16} />
                  </button>
                </div>
              </td>
            </motion.tr>
          ))
        ) : (
          <tr className="bg-gray-200 h-[480px]">
            <td colSpan="9" className="text-center text-gray-600 text-xl p-3">
              لا توجد منتجات. يرجى مسح المنتجات لإضافتها.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default PosTable;
