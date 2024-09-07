import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { createAccountApi } from "../../services/apiDatabase";
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
  const { mutate: createAccount, isPending: isUploading } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: () => {
      toast.success("Check your mail box to confirm registration!");
      reset();
      setEmail("");
    },
    onError: (err) => {
      toast.error(`Error: ${err}`);
      console.error(`Error: ${err}`);
    },
  });

  return { isUploading, createAccount };
}
export default useAuth;
