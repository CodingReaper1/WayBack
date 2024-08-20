import { useContext } from "react";
import { MapContext } from "./MapContext";

function useMapContext() {
  const context = useContext(MapContext);
  if (context === null)
    throw new Error("MapContext was used outside of MapProvider");
  return context;
}

export default useMapContext;
