import { Map as LeafletMap } from "leaflet";
import { createContext, useReducer } from "react";

type MapContextTypes = {
  map: LeafletMap | null;
  saveMap: (data: LeafletMap) => void;
};

type MapState = {
  map: LeafletMap | null;
};

type MapAction = {
  type: "Map/saveMap";
  payload: LeafletMap;
};

const MapContext = createContext<MapContextTypes | null>(null);

const initalState: MapState = {
  map: null,
};

function reducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case "Map/saveMap":
      return { ...state, map: action.payload };

    default:
      throw new Error("Unknow action");
  }
}

function MapProvider({ children }: { children: React.ReactNode }) {
  const [{ map }, dispatch] = useReducer(reducer, initalState);

  function saveMap(data: LeafletMap) {
    dispatch({ type: "Map/saveMap", payload: data });
  }

  return (
    <MapContext.Provider value={{ saveMap, map }}>
      {children}
    </MapContext.Provider>
  );
}

export { MapProvider, MapContext };
