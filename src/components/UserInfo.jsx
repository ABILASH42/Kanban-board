import React, { useRef, useState, memo } from "react";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import useClickOutside from "../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";

function UserInfo() {
  const [isOpen, setIsOpen] = useState();
  const userName = sessionStorage.getItem("userName");
  const divRef = useRef();
  const navigate = useNavigate();

  useClickOutside(divRef, () => {
    setIsOpen();
  });

  function logout() {
    sessionStorage.removeItem("userName");
    navigate("/");
  }

  return (
    <div className="absolute top-1 right-1" ref={divRef} tabIndex={-1}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-500 transition"
      >
        <img
          src={sessionStorage.getItem("img")||"/img/profile.png"}
          alt="profile"
          className="w-full h-full object-cover"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
          <div className="px-4 py-2 text-gray-800 dark:text-gray-200 font-semibold">
            {userName}
          </div>
          <div className="px-4 py-2">
            <ToggleDarkModeButton />
          </div>
          <div className="px-4 py-2">
            <button
              onClick={logout}
              className="w-full text-left px-3 py-2 rounded-lg text-red-600 hover:bg-red-100 dark:hover:bg-red-600 dark:hover:text-white transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserInfo;
