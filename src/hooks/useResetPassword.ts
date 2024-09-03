import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../services/apiDatabase";
import toast from "react-hot-toast";
import useLoginContext from "../context/useLoginContext";
import { useNavigate } from "react-router-dom";

function useResetPassword() {
  const { enableButton } = useLoginContext();
  const navigate = useNavigate();

  const { data, mutate: resetPassword } = useMutation({
    mutationFn: resetPasswordApi,
    onSuccess: () => {
      toast.success(`Password has been reset sussefully!`);
      navigate("/login");
      enableButton();
    },
    onError: (err) => {
      toast.error(`Error: ${err.message}`);
      enableButton();
    },
  });

  return { resetPassword, data };
}

export default useResetPassword;
