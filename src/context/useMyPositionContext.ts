import { useContext } from "react";
import { MyPositionContext } from "./MyPositionContext";

function useMyPositionContext() {
  const context = useContext(MyPositionContext);
  if (context === null)
    throw new Error("MyPositionContext was used outside of MyPositionProvider");
  return context;
}

export default useMyPositionContext;
