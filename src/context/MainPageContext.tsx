import { createContext, useReducer } from "react";

type MainPageContextTypes = {
  sideBarFormOpen: boolean;
  routeLocked: boolean;
  lockedId: number;
  sideBarOpened: boolean;

  openSideBar: () => void;
  closeSideBar: () => void;
  lockRoute: (data: number) => void;
  unlockRoute: () => void;
  openSideBarForm: () => void;
  closeSideBarForm: () => void;
};

type InitalStateTypes = {
  sideBarFormOpen: boolean;
  routeLocked: boolean;
  lockedId: number;
  sideBarOpened: boolean;
};

type WithoutPayloadAction = {
  type:
    | "MainPage/openSideBar"
    | "MainPage/closeSideBar"
    | "MainPage/openSideBarForm"
    | "MainPage/closeSideBarForm"
    | "MainPage/unlockRoute";
};

type WithNumberPayloadAction = {
  type: "MainPage/lockRoute";
  payload: number;
};

type ActionTypes = WithoutPayloadAction | WithNumberPayloadAction;

const MainPageContext = createContext<MainPageContextTypes | null>(null);

const initalState: InitalStateTypes = {
  sideBarFormOpen: false,
  routeLocked: false,
  lockedId: -1,
  sideBarOpened: true,
};

function reducer(
  state: InitalStateTypes,
  action: ActionTypes,
): InitalStateTypes {
  switch (action.type) {
    case "MainPage/openSideBar":
      return { ...state, sideBarOpened: true };

    case "MainPage/closeSideBar":
      return { ...state, sideBarOpened: false };

    case "MainPage/lockRoute":
      return { ...state, lockedId: action.payload, routeLocked: true };

    case "MainPage/unlockRoute":
      return { ...state, lockedId: -1, routeLocked: false };

    case "MainPage/openSideBarForm":
      return { ...state, sideBarFormOpen: true };

    case "MainPage/closeSideBarForm":
      return { ...state, sideBarFormOpen: false };

    default:
      throw new Error("Unknow action");
  }
}

function MainPageProvider({ children }: { children: React.ReactNode }) {
  const [{ sideBarFormOpen, routeLocked, lockedId, sideBarOpened }, dispatch] =
    useReducer(reducer, initalState);

  function openSideBar() {
    dispatch({ type: "MainPage/openSideBar" });
  }

  function closeSideBar() {
    dispatch({ type: "MainPage/closeSideBar" });
  }

  function lockRoute(data: number) {
    dispatch({ type: "MainPage/lockRoute", payload: data });
  }

  function unlockRoute() {
    dispatch({ type: "MainPage/unlockRoute" });
  }

  function closeSideBarForm() {
    dispatch({ type: "MainPage/closeSideBarForm" });
  }

  function openSideBarForm() {
    dispatch({ type: "MainPage/openSideBarForm" });
  }

  return (
    <MainPageContext.Provider
      value={{
        sideBarFormOpen,
        routeLocked,
        lockedId,
        sideBarOpened,

        openSideBar,
        closeSideBar,
        lockRoute,
        unlockRoute,
        closeSideBarForm,
        openSideBarForm,
      }}
    >
      {children}
    </MainPageContext.Provider>
  );
}

export { MainPageProvider, MainPageContext };
