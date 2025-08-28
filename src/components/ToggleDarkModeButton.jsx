// import { useState, useEffect } from "react";

// export default function DarkModeToggle() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const storedMode = sessionStorage.getItem("darkMode");
//     if (storedMode === "true") {
//       setDarkMode(true);
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//       sessionStorage.setItem("darkMode", "true");
//     } else {
//       document.documentElement.classList.remove("dark");
//       sessionStorage.setItem("darkMode", "false");
//     }
//   }, [darkMode]);

//   return (
//     <div className="flex justify-end items-center gap-3 p-4">
//       <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
//         {darkMode ? "Dark Mode" : "Light Mode"}
//       </span>
//       <button
//         onClick={() => setDarkMode(!darkMode)}
//         className={`relative w-14 h-8 flex items-center rounded-full 
//                    transition-colors duration-300 
//                    ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
//       >
//         <span
//           className={`absolute left-1 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300
//             ${darkMode ? "translate-x-6" : "translate-x-0"}`}
//         />
//       </button>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Sun, SunMoon } from "lucide-react";

export default function DarkModeToggle() {
const getInitialMode = () => sessionStorage.getItem("darkMode") === "true";
const [darkMode, setDarkMode] = useState(getInitialMode);
  

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      sessionStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      sessionStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  return (
    <li 
      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 text-yellow-500" />
      ) : (
        <SunMoon className="w-5 h-5 text-gray-900 dark:text-gray-100" />
      )}
      <span className="dark:text-white">{darkMode ? "Light Mode" : "Dark Mode"}</span>
    </li>
  );
}
