import React, { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/LoginAni.json";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from "axios";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

function Login() {
  const isNonMobile = useMediaQuery("(min-width:1200px)");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,

    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
    if (!password) {
      errors.password = "Required";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    const errors = validate();
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/users/signin",
        { email, password }
      );
      signIn({
        token: response.data.token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { name: response.data.username },
      });
      navigate("/selectAccount");
      console.log(response.data);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Error message from server
      } else {
        console.log(err);
        setError("An error occurred. Please try again."); // Generic error message
      }
    }
  };

  return (
    <div
      className="flex flex-col justify-center sm:flex-row h-screen"
      dir="rtl"
    >
      <div className="hidden sm:flex flex-col justify-center bg-slate-100 items-center w-full sm:w-2/3  shadow-lg">
        <Lottie
          options={defaultOptions}
          height={isNonMobile ? "100%" : "400px"}
          width={isNonMobile ? "100%" : "400px"}
        />
      </div>
      <div className="flex flex-col justify-center items-center w-full sm:w-1/2 p-8 bg-white">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
          Fawatiri
        </h1>
        <h1 className="text-2xl font-semibold mb-4">تسجيل الدخول</h1>
        <p className="mb-8 text-gray-600">
          مرحبا بك في عالم فواتيري سجل دخولك الان
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="w-full max-w-sm" dir="rtl">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              الايميل
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              الباسورد
            </label>
            <input
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            تسجيل الدخول
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
