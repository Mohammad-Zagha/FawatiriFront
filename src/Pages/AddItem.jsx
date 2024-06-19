import { useState } from "react";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Box, Chip } from "@mui/joy";

function AddItem() {
  const [types, setTypes] = useState([]);

  const [formData, setFormData] = useState({
    itemName: "",
    printedName: "",
    MainBarcode: "",
    currency: "NIS",
    tax: "",
    taxExempt: false,
    initialPrice: "",
    currentCostPrice: "0",
    mainCategory: "",
    currentStock: "30",
    containers: [],
  });
  const addItem = (type) => {
    setTypes((prev) => {
      const isTypeIncluded = prev.includes(type);
      const updatedTypes = isTypeIncluded
        ? prev.filter((item) => item !== type)
        : [...prev, type];

      setFormData((formData) => ({
        ...formData,
        mainCategory: updatedTypes.length > 0 ? updatedTypes[0] : "",
        containers: isTypeIncluded
          ? formData.containers.filter((container) => container.name !== type) // Remove the container
          : [
              ...formData.containers,
              {
                barcodes: [], // Empty as default
                price: 0, // Default price
                name: type,
                quantity: 0, // Default quantity
              },
            ], // Add new container
      }));

      return updatedTypes;
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSelectChange = (selected, key) => {
    setFormData({
      ...formData,
      [key]: selected,
    });
  };

  const handlePriceChange = (price, type) => {
    setFormData((formData) => {
      return {
        ...formData,
        containers: formData.containers.map((container) =>
          container.name === type
            ? { ...container, price: parseFloat(price) || 0 }
            : container
        ),
      };
    });
  };

  const handleBarcodeChange = (e, type, rowIndex) => {
    const newBarcodeValue = e.target.value.trim(); // Trim spaces and get the new barcode value
    setFormData((formData) => {
      return {
        ...formData,
        containers: formData.containers.map((container) => {
          if (container.name === type) {
            let updatedBarcodes = [...container.barcodes];
            if (newBarcodeValue === "") {
              // Remove the barcode if the input is empty
              if (updatedBarcodes[rowIndex]) {
                updatedBarcodes.splice(rowIndex, 1);
              }
            } else if (updatedBarcodes[rowIndex]) {
              // Update existing barcode
              updatedBarcodes[rowIndex] = { code: newBarcodeValue };
            } else {
              // Add new barcode if not exist at that index
              updatedBarcodes.push({ code: newBarcodeValue });
            }
            return { ...container, barcodes: updatedBarcodes };
          } else {
            return container;
          }
        }),
      };
    });
  };

  const handleSubmit = () => {
    console.log(formData);
    // Submit logic or API call
  };
  const inputFields = Array.from({ length: 10 }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {types.map((type, typeIndex) => {
        // Find the container and barcode for the current type and row index
        const container = formData.containers.find((c) => c.name === type);
        const barcodeValue =
          container && container.barcodes[rowIndex]
            ? container.barcodes[rowIndex].code
            : "";

        return (
          <td key={typeIndex} className="p-2">
            <input
              type="text"
              name={`${type}-barcode-${rowIndex}`}
              value={barcodeValue}
              className="block mr-auto w-full h-9 ml-10 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              onChange={(e) => handleBarcodeChange(e, type, rowIndex)}
              placeholder=""
            />
          </td>
        );
      })}
    </tr>
  ));

  return (
    <>
      <div
        dir="rtl"
        className="bg-white h-screen md:h-full sm:h-full flex flex-col lg:flex-row gap-4 w-full p-5 justify-between lg:items-start md:items-center sm:items-center"
      >
        <div
          dir="rtl"
          className="h-2/3 w-fit bg-white rounded-[12px] p-5 flex"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
          }}
        >
          {/* Item information */}
          <div className="flex flex-col gap-5 w-72 border-l-2 h-fit pl-4">
            <h1 className="text-start text-xl text-gray-600 font-bold">
              معلومات الصنف رقم : 5984
            </h1>

            {/* Input for item name */}
            <div className="relative">
              <input
                type="text"
                name="itemName"
                id="itemName"
                className="block w-full h-9 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                placeholder=""
                value={formData.itemName}
                onChange={handleInputChange}
              />
              <label
                for="itemName"
                class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
              ></label>
            </div>

            {/* Input for printed name */}
            <div className="relative">
              <input
                type="text"
                name="printedName"
                className="block w-full px-2.5 pb-2.5 pt-4 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={formData.printedName}
                onChange={handleInputChange}
              />
            </div>

            {/* Input for barcode */}
            <div className="relative">
              <input
                type="text"
                name="MainBarcode"
                className="block px-2.5 w-full pb-2.5 pt-4 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={formData.barcode}
                onChange={handleInputChange}
              />
            </div>

            {/* Currency selection */}
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label
                  htmlFor="currency"
                  className="block text-sm font-medium text-gray-900"
                >
                  العملة
                </label>
                <select
                  id="currency"
                  name="currency"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                  value={formData.currency}
                  onChange={handleSelectChange}
                >
                  <option value="NIS">NIS</option>
                  <option value="USD">USD</option>
                  <option value="JD">JD</option>
                </select>
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="tax"
                  className="block text-sm font-medium text-gray-900"
                >
                  الضريبة
                </label>
                <input
                  type="text"
                  name="tax"
                  className="block w-full h-9 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=""
                  value={formData.tax}
                  onChange={handleInputChange}
                />
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    name="taxExempt"
                    checked={formData.taxExempt}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="taxExempt"
                    className="ml-2 text-sm font-medium text-gray-600"
                  >
                    معفاة
                  </label>
                </div>
              </div>
            </div>

            {/* Other inputs for price and cost */}
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <label
                  htmlFor="initialPrice"
                  className="block text-sm font-medium text-gray-900"
                >
                  السعر الابتدائي
                </label>
                <input
                  type="text"
                  name="initialPrice"
                  className="block w-full h-9 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600"
                  placeholder=""
                  value={formData.initialPrice}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="currentCostPrice"
                  className="block text-sm font-medium text-gray-900"
                >
                  السعر التكلفة الحالي
                </label>
                <input
                  type="text"
                  name="currentCostPrice"
                  className="block w-full h-9 text-xl font-bold bg-gray-300 text-gray-500 rounded-lg border border-gray-300 appearance-none"
                  placeholder=""
                  value={formData.currentCostPrice}
                  readOnly={true}
                />
              </div>
            </div>
            <Select
              multiple
              placeholder="الوحدات"
              onChange={(selected) => addItem(selected.target.innerHTML)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                  {selected.map((selectedOption) => (
                    <Chip
                      variant="soft"
                      color="primary"
                      key={selectedOption.value || index}
                    >
                      {selectedOption.label}
                    </Chip>
                  ))}
                </Box>
              )}
              sx={{
                minWidth: "15rem",
              }}
              slotProps={{
                listbox: {
                  sx: {
                    width: "100%",
                  },
                },
              }}
            >
              <Option value="حبة">حبة</Option>
              <Option value="كرتونة">كرتونة</Option>
              <Option value="مشتاح">مشتاح</Option>
              <Option value="ربطة">ربطة</Option>
            </Select>
          </div>
          <div className="flex flex-col gap-5 h-auto w-auto   pr-4 pl-3">
            <h1 className="text-start text-xl text-gray-600 font-bold ">
              القوائم (اختياري)
            </h1>
            <Select
              multiple
              placeholder="اختر القوائم"
              renderValue={(selected) => (
                <Box sx={{ display: "flex", gap: "0.25rem" }}>
                  {selected.map((selectedOption) => (
                    <Chip
                      variant="soft"
                      color="primary"
                      key={selectedOption.value || index}
                    >
                      {selectedOption.label}
                    </Chip>
                  ))}
                </Box>
              )}
              sx={{
                minWidth: "15rem",
              }}
              slotProps={{
                listbox: {
                  sx: {
                    width: "100%",
                  },
                },
              }}
            >
              <Option value="0.5شيكل">0.5 شيكل</Option>
              <Option value="البان و اجبان">البان و اجبان</Option>
              <Option value="اصناف ثلاجة">اصناف ثلاجة</Option>
            </Select>
            <h1 className="text-start text-[20px] text-gray-600 font-bold  ">
              التصنيف (اختياري)
            </h1>
            <div className="flex gap-2">
              <h1 className="text-start text-[14px] text-gray-700 font-bold  ">
                الصنف الرائيسي
              </h1>
              <Select
                placeholder="بلا"
                sx={{
                  minWidth: "7.5rem",
                }}
              >
                <Option value="dog">حلويات</Option>
                <Option value="cat">دخان</Option>
                <Option value="fish">البان</Option>
                <Option value="bird">اجبان</Option>
              </Select>
            </div>
            <h1 className="text-start text-xl text-gray-600 font-bold ">
              المخزون الحالي
            </h1>
            <input
              type="text"
              id="tax"
              value=" 30"
              className="block w-full h-9 text-xl font-bold bg-gray-300 text-black rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 "
              readOnly={true}
            />
            <h1 className="text-start text-xl text-gray-600 font-bold ">
              صورة المنتج
            </h1>
            <div className="flex gap-2 justify-between">
              <img
                className="rounded w-36 h-36"
                src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
                alt="Extra large avatar"
              />
              <button className="py-auto my-auto px-6 rounded-lg text-sm font-medium bg-teal-200 text-teal-800 h-10 text-center">
                تعديل الصورة
              </button>
            </div>
          </div>
        </div>

        <div
          dir="rtl"
          className="min-h-2/6 h-2/6 w-full bg-white rounded-[12px] p-5 flex flex-col overflow-y-scroll"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
          }}
        >
          <h1 className="text-center text-xl text-gray-600 font-bold">
            اسعار بيع الوحدات
          </h1>

          {types.length === 0 ? (
            <div className="flex-grow flex items-center justify-center w-full ">
              <h1 className="text-lg text-gray-500">الرجاء اختيار الوحدات</h1>
            </div>
          ) : (
            <table className="table-auto mt-4  shadow-md rounded-lg w-full ">
              <thead className="bg-blue-300 text-white ">
                <tr>
                  <th className="px-3 py-2 text-start"> الوحدة</th>
                  <th className="px-3 py-2 text-start"> سعر البيع</th>
                  <th className="px-3 py-2 text-start">حد اعلى</th>
                  <th className="px-4 py-2 text-start">حد ادنى</th>
                </tr>
              </thead>
              <tbody>
                {types.map((type, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="px-4 py-2">{type}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="block w-20 h-9 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                        onChange={(e) =>
                          handlePriceChange(e.target.value, type)
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="block w-20 h-9 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="block w-20 h-9 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div
          dir="rtl"
          className="min-h-2/6 h-2/3 max-h-2/3 w-full bg-white rounded-[12px] p-5 flex flex-col overflow-y-scroll"
          style={{
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
          }}
        >
          <h1 className="text-center text-xl text-gray-600 font-bold">
            الباركود
          </h1>

          {types.length === 0 ? (
            <div className="flex-grow flex items-center justify-center min-w-96  ">
              <h1 className="text-lg text-gray-500">الرجاء اختيار الوحدات</h1>
            </div>
          ) : (
            <table className="table-auto mt-4 shadow-md rounded-lg w-full">
              <thead className="bg-gray-300 text-white">
                <tr>
                  {types.map((type, index) => (
                    <th key={index} className="px-6 py-3">
                      {type}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>{inputFields}</tbody>
            </table>
          )}
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
}
export default AddItem;
{
  /* <div className="flex flex-col pr-4 gap-3  ">
            <h1 className="text-start text-[20px] text-gray-600 font-bold  ">
              عدد الوحدات
            </h1>
            <div className="flex gap-2">
              <h1 className="text-lg">حبة</h1>
              <h1 className="text-sm mt-1 text-gray-700">(الاساسية)</h1>
              <input
                type="text"
                id="tax"
                className="block mr-auto w-20 h-9  ml-10 text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
            </div>
            <div className="flex gap-2">
              <h1>كرتونة</h1>
              <input
                type="text"
                id="tax"
                className="block mr-auto ml-10 w-20 h-9  text-xl font-bold text-gray-900 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
              />
            </div>
          </div> */
}
