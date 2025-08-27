import React, { useRef, useState ,memo} from "react";
import ToggleDarkModeButton from "./ToggleDarkModeButton";
import useClickOutside from "../hooks/useClickOutside";

function UserInfo() {
  const [isOpen, setIsOpen] = useState(false);
  const userName = sessionStorage.getItem("userName");
  const divRef = useRef();
  useClickOutside(divRef, () => {
    setIsOpen(false);
  });

  return (
    <div className="absolute top-1 right-1" ref={divRef} tabIndex={-1}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 hover:border-gray-500 transition"
      >
        <img
          src="/img/profile.png"
          alt="profile"
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-50">
          <div className="px-4 py-2 text-gray-800 dark:text-gray-200 font-semibold">
            {userName}
          </div>
          <div className="px-4 py-2">
            <ToggleDarkModeButton />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(UserInfo);
