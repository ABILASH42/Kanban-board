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
