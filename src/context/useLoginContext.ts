import { useContext } from "react";
import { LoginCotext } from "./LoginContext";

function useLoginContext() {
  const context = useContext(LoginCotext);
  if (context === null)
    throw new Error("LoginContext was used outside of LoginProvider");
  return context;
}

export default useLoginContext;
