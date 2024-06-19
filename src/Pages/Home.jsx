import LOGO from "../assets/fawatiri.png";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CashBoxDisplay from "../components/chashBoxDisplay";
import { FaPlus } from "react-icons/fa";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie";
function Home() {
  const token = Cookies.get("_auth");
  return (
    <div dir="rtl">
      <div className="bg-slate-100 h-svh flex justify-between" dir="rtl">
        <SideBar />
        <div className="grid grid-cols-3 h-fit p-5 gap-x-4 gap-y-6">
          <div className="col-span-3">
            <h1 className="text-3xl font-bold text-slate-950  "> التحاليل </h1>
          </div>
          <div
            className="h-36 w-72 bg-white  rounded-[36px] p-4 flex justify-between sm:col-span-3 md:col-span-3 lg:col-span-1  "
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            }}
          >
            <div>
              <h1 className="text-start text-2xl text-gray-950 font-sans">
                ارباح الشهر
              </h1>
              <h1 className="text-start text-lg text-gray-950 font-sans">
                1/4/2024
              </h1>
              <h1 className="text-start text-3xl text-black font-bold mt-4">
                $12,000
              </h1>
            </div>
            <CircularProgressbar
              className="h-20 w-20 mt-4"
              value={66}
              text={`+${66}%`}
              styles={buildStyles({
                pathColor: "green",
                textColor: "green",
              })}
            />
          </div>
          <div
            className="h-36 w-72 bg-white  rounded-[36px] p-4 flex justify-between sm:col-span-3 md:col-span-3 lg:col-span-1  "
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            }}
          >
            <div>
              <h1 className="text-start text-xl text-gray-950 font-sans">
                مجموع المشتريات
              </h1>
              <h1 className="text-start text-lg text-gray-950 font-sans">
                1/4/2024
              </h1>
              <h1 className="text-start text-3xl text-black font-bold mt-5">
                $75,684
              </h1>
            </div>
            <CircularProgressbar
              className="h-20 w-20 mt-4"
              value={66}
              text={`+${66}%`}
              styles={buildStyles({
                pathColor: "orange",
                textColor: "orange",
              })}
            />
          </div>
          <div
            className="h-36 w-72 bg-white  rounded-[36px] p-4 flex justify-between sm:col-span-3 md:col-span-3 lg:col-span-1  "
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            }}
          >
            <div>
              <h1 className="text-start text-xl text-gray-950 font-sans">
                مجموع المبيعات
              </h1>
              <h1 className="text-start text-lg text-gray-950 font-sans">
                1/4/2024
              </h1>
              <h1 className="text-start text-3xl text-black font-bold mt-5">
                $87,684
              </h1>
            </div>
            <CircularProgressbar
              className="h-20 w-20 mt-4"
              value={66}
              text={`+${66}%`}
              styles={buildStyles({
                pathColor: "blue",
                textColor: "blue",
              })}
            />
          </div>
          <div className="col-span-3">
            <h1 className="text-2xl font-bold text-slate-800  "> الصناديق </h1>
          </div>
          <div
            className="h-36  bg-white col-span-3 rounded-[36px] flex justify-start  "
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            }}
          >
            <CashBoxDisplay
              height={12}
              width={12}
              name="ميلان 1"
              img="https://images.unsplash.com/photo-1578916171728-46686eac8d58?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <CashBoxDisplay
              height={12}
              width={12}
              name="ميلان 2"
              img="https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />

            <div className="flex flex-col justify-center text-center items-center mr-auto ml-4  ">
              <FaPlus
                style={{
                  fontSize: "70px",
                  color: "grey",
                }}
              />
              <h1 className="text-xl font-bold text-gray-600 ">اضافة صندوق</h1>
            </div>
          </div>
          <div className="col-span-3">
            <h1 className="text-2xl font-bold text-slate-800  ">
              اخر الفواتير
            </h1>
          </div>
          <div
            className="h-52 col-span-3 bg-white  rounded-[36px] overflow-y-auto"
            dir="rtl"
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            }}
          >
            <table className="table-auto w-full shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-300 text-white">
                <tr>
                  <th className="px-4 py-2 text-start">رقم الفاتورة</th>
                  <th className="px-4 py-2 text-start">اسم التاجر</th>
                  <th className="px-4 py-2 text-start">القيمة</th>
                  <th className="px-4 py-2 text-start">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-4 py-2">1001</td>
                  <td className="px-4 py-2">أحمد علي</td>
                  <td className="px-4 py-2">$250.00</td>
                  <td className="px-4 py-2">2024-01-01</td>
                </tr>
                <tr className="bg-gray-100 border-b">
                  <td className="px-4 py-2">1002</td>
                  <td className="px-4 py-2">محمد حسن</td>
                  <td className="px-4 py-2">$450.00</td>
                  <td className="px-4 py-2">2024-02-15</td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-4 py-2">1003</td>
                  <td className="px-4 py-2">سارة إبراهيم</td>
                  <td className="px-4 py-2">$600.00</td>
                  <td className="px-4 py-2">2024-03-10</td>
                </tr>
                <tr className="bg-gray-100 border-b">
                  <td className="px-4 py-2">1004</td>
                  <td className="px-4 py-2">فاطمة يوسف</td>
                  <td className="px-4 py-2">$320.00</td>
                  <td className="px-4 py-2">2024-04-05</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-5 mt-14">
          <div
            className="h-80 w-80 rounded-[36px] bg-white flex flex-col"
            style={{
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            }}
          >
            <img
              className="inline-block h-56 w-72 rounded-full mr-4 "
              src={LOGO}
              alt="logo"
            ></img>
            <h1 className="text-center font-bold text-3xl">Fawatiri</h1>
            <h1 className="text-center text-xl text-slate-600">
              فواتيري التوب يا غالي
            </h1>
          </div>
          <div className="flex justify-between p-2" dir="rtl">
            <h1 className="text-center font-bold text-2xl">الاشعارات</h1>
            <div className=" h-10 w-10 rounded-full bg-white flex justify-center items-center">
              <MdOutlineNotificationsActive
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              />
            </div>
          </div>
          <div
            className="h-20  bg-white rounded-[15px] flex justify-start p-5 items-center"
            dir="rtl"
          >
            <div className=" h-10 w-10 rounded-[12px] bg-red-500 flex justify-center items-center ml-2">
              <IoWarningOutline
                style={{
                  fontSize: "26px",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div>
              <h1 className="text-start text-xl text-slate-900 font-bold">
                تاريخ الاشتراك
              </h1>
              <h1 className="text-center text-sm text-slate-600">
                شارف تاريخ الاشتراك على الانتهاء
              </h1>
            </div>
            <MdDeleteOutline
              style={{
                marginRight: "auto",
                marginTop: "10px",
                fontSize: "26px",
                color: "black",
                fontWeight: "bold",
              }}
            />
          </div>
          <div
            className="h-20  bg-white rounded-[15px] flex justify-start p-5 items-center"
            dir="rtl"
          >
            <div className=" h-10 w-10 rounded-[12px] bg-green-500 flex justify-center items-center ml-2">
              <MdDone
                style={{
                  fontSize: "26px",
                  color: "white",
                  fontWeight: "bold",
                }}
              />
            </div>
            <div>
              <h1 className="text-start text-xl text-slate-900 font-bold">
                تجديد الاشتراك
              </h1>
              <h1 className="text-start text-sm text-slate-600">
                تم تجديد الاشتراك
              </h1>
            </div>
            <MdDeleteOutline
              style={{
                marginRight: "auto",
                fontSize: "26px",
                color: "black",
                fontWeight: "bold",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
