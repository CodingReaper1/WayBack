import { useContext } from "react";
import { MainPageContext } from "./MainPageContext";

function useMainPageContext() {
  const context = useContext(MainPageContext);
  if (context === null)
    throw new Error("MainPageContext was used outside of MapProvider");
  return context;
}

export default useMainPageContext;
