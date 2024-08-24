import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createAccountApi } from "../services/apiDatabase";
import useLoginContext from "../context/useLoginContext";

function useAuth() {
  const navigate = useNavigate();
  const { signIn } = useLoginContext();

  const { mutate: createAccount, isPending: isUploading } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: (data) => {
      navigate(`/map/${data.user.id}`);
      toast.success("Your account has been created!");
      signIn();
    },
    onError: (err) => {
      toast.error(err?.message);
    },
  });

  return { isUploading, createAccount };
}
export default useAuth;
