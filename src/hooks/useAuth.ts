import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createAccountApi } from "../services/apiDatabase";
// import useLoginContext from "../context/useLoginContext";
// import useLocalStorageState from "./useLocalStorageState";
import { UseFormReset } from "react-hook-form";

type OnSubmitTypes = {
  rePassword: string;
  firstName: string;
  signUpEmail: string;
  signUpPassword: string;
};

function useAuth(
  reset: UseFormReset<OnSubmitTypes>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
) {
  // const navigate = useNavigate();
  // const { signIn } = useLoginContext();
  // const [UserID, setUserID] = useLocalStorageState("", "UserID");

  const { mutate: createAccount, isPending: isUploading } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: (data) => {
      console.log(data.user.id);
      // navigate(`/confirm`);
      // setUserID(data.user.id);
      toast.success("Check your mail box to confirm registration!");
      // signIn();
      reset();
      setEmail("");
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return { isUploading, createAccount };
}
export default useAuth;
