import React, { useEffect, useState ,useRef} from "react";
import { useNavigate } from "react-router-dom";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import useClickOutside from "../hooks/useClickOutside";


function LoginPage({setIsAuthenticated}) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  async function signIn() {
    if (!userName || !password) {
      alert("Enter username and password");
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userName,
          password: password,
        }),
      });
      if (!res.ok) {
        throw new Error("Invalid credentials");
      }
        const data = await res.json();
        console.log(data)
        setIsAuthenticated(true);
        sessionStorage.setItem("userName",data.firstName+data.lastName)
        navigate("/board");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
      <div className="bg-gray-300 dark:bg-black relative w-full h-screen flex items-center justify-center">
          <div className="absolute top-1 right-1"><ToggleDarkModeButton /></div>
      
      <div className="bg-white dark:bg-gray-800 h-auto w-[28rem] p-8 rounded-3xl shadow-2xl flex flex-col gap-6" >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Login
        </h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="userName"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Username
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            id="userName"
            className="px-3 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="px-3 py-2 w-full rounded-lg border border-gray-300 dark:border-gray-600 
                   bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={signIn}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
