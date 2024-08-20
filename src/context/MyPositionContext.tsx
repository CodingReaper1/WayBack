import { createContext, useReducer } from "react";

type MyPositionContextTypes = {
  changeMyPosition: (data: [number, number]) => void;
  myPosition: [number, number];
};

type InitialStateTypes = {
  myPosition: [number, number];
};

type ActionTypes = {
  type: "MyPosition/changeMyPosition";
  payload: [number, number];
};

const MyPositionContext = createContext<MyPositionContextTypes | null>(null);

const initalState: InitialStateTypes = {
  myPosition: [42.05337156043361, 43.73107910156251],
};

function reducer(
  state: InitialStateTypes,
  action: ActionTypes,
): InitialStateTypes {
  switch (action.type) {
    case "MyPosition/changeMyPosition":
      return { ...state, myPosition: action.payload };

    default:
      throw new Error("Unknow action");
  }
}

function MyPositionProvider({ children }: { children: React.ReactNode }) {
  const [{ myPosition }, dispatch] = useReducer(reducer, initalState);

  function changeMyPosition(data: [number, number]) {
    dispatch({ type: "MyPosition/changeMyPosition", payload: data });
  }

  return (
    <MyPositionContext.Provider value={{ changeMyPosition, myPosition }}>
      {children}
    </MyPositionContext.Provider>
  );
}

export { MyPositionProvider, MyPositionContext };
