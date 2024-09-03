import useDarkModeContext from "../../context/useDarkModeContext";
import { useEffect } from "react";

type DarkModeToggleTypes = {
  display?: boolean;
};

function DarkModeToggle({ display = true }: DarkModeToggleTypes) {
  const { isDarkMode, toggleDarkMode } = useDarkModeContext();
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      className={`h-20 w-20  cursor-pointer overflow-hidden rounded-md p-2 transition-all duration-300 ${display ? "" : "hidden"}`}
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <img src="/sun.png" /> : <img src="/moon.png " />}
    </button>
  );
}

export default DarkModeToggle;
