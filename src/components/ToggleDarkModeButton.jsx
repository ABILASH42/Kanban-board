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
import { Sun, Moon } from "lucide-react"; // icons

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = sessionStorage.getItem("darkMode");
    if (storedMode === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

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
    <div className="flex justify-end items-center gap-3 p-4 fixed right-1 top-1">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="w-12 h-12 flex items-center justify-center rounded-full 
                   bg-gray-200 dark:bg-gray-800 shadow-md transition-all duration-300"
      >
        {darkMode ? (
          <Sun className="w-6 h-6 text-yellow-500 transition-transform duration-500 rotate-180" />
        ) : (
          <Moon className="w-6 h-6 text-gray-900 dark:text-gray-100 transition-transform duration-500 rotate-180" />
        )}
      </button>
    </div>
  );
}
