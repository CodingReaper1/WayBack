import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

function useDarkModeContext() {
  const context = useContext(DarkModeContext);
  if (context === null)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");

  return context;
}

export default useDarkModeContext;
