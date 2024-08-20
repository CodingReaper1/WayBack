import React, { createContext, useReducer } from "react";

type LoginContextTypes = {
  signUpActive: boolean;
  isButtonReady: boolean;
  signUp: () => void;
  signIn: () => void;
  disableButton: () => void;
  enableButton: () => void;
};

type InitialStateTypes = {
  signUpActive: boolean;
  isButtonReady: boolean;
};

type ActionTypes = {
  type:
    | "Login/signUp"
    | "Login/signIn"
    | "Login/disableButton"
    | "Login/enableButton";
};

const LoginCotext = createContext<LoginContextTypes | null>(null);

const initialState = {
  signUpActive: false,
  isButtonReady: false,
};

function reducer(
  state: InitialStateTypes,
  action: ActionTypes,
): InitialStateTypes {
  switch (action.type) {
    case "Login/signUp":
      return { ...state, signUpActive: true };

    case "Login/signIn":
      return { ...state, signUpActive: false };

    case "Login/disableButton":
      return { ...state, isButtonReady: true };

    case "Login/enableButton":
      return { ...state, isButtonReady: false };
  }
}

function LoginProvider({ children }: { children: React.ReactNode }) {
  const [{ signUpActive, isButtonReady }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  function signUp() {
    dispatch({ type: "Login/signUp" });
  }

  function signIn() {
    dispatch({ type: "Login/signIn" });
  }

  function disableButton() {
    dispatch({ type: "Login/disableButton" });
  }
  function enableButton() {
    dispatch({ type: "Login/enableButton" });
  }

  return (
    <LoginCotext.Provider
      value={{
        signUpActive,
        signIn,
        signUp,
        disableButton,
        enableButton,
        isButtonReady,
      }}
    >
      {children}
    </LoginCotext.Provider>
  );
}

export { LoginProvider, LoginCotext };
