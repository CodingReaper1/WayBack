import { createContext, useContext, useReducer } from "react";

const MapReadyContext = createContext();

const initalState = {
  mapIsReady: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "mapReady/ready":
      return { ...state, mapIsReady: true };

    case "mapReady/notReady":
      return { ...state, mapIsReady: false };

    default:
      throw new Error("Unknow action");
  }
}

function MapReadyProvider({ children }) {
  const [{ mapIsReady }, dispatch] = useReducer(reducer, initalState);

  function mapNotReady() {
    dispatch({ type: "mapReady/notReady" });
  }

  function mapReady() {
    dispatch({ type: "mapReady/ready" });
  }

  return (
    <MapReadyContext.Provider
      value={{ dispatch, mapIsReady, mapReady, mapNotReady }}
    >
      {children}
    </MapReadyContext.Provider>
  );
}

function useMapReadyContext() {
  const context = useContext(MapReadyContext);
  if (context === undefined)
    throw new Error("MapContext was used outside of MapInteractingProvider");
  return context;
}

export { MapReadyProvider, useMapReadyContext };
