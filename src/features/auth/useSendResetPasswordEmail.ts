import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordEmailApi } from "../../services/apiDatabase";
import toast from "react-hot-toast";
import useLoginContext from "../../context/useLoginContext";

function useSendResetPasswordEmail() {
  const { enableButton } = useLoginContext();

  const { data, mutate: sendResetPasswordEmail } = useMutation({
    mutationFn: sendResetPasswordEmailApi,
    onSuccess: () => {
      toast.success(`Password recovery email has been sent.`);
      enableButton();
    },
    onError: (err) => {
      toast.error(`Error: ${err}`);
      console.error(`Error: ${err}`);
      enableButton();
    },
  });

  return { sendResetPasswordEmail, data };
}

export default useSendResetPasswordEmail;
