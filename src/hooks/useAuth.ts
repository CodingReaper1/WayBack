import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createAccountApi } from "../services/apiDatabase";
import useLoginContext from "../context/useLoginContext";

function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { signIn, enableButton } = useLoginContext();

  const { mutate: createAccount, isPending: isUploading } = useMutation({
    mutationFn: createAccountApi,
    onSuccess: (data) => {
      navigate(`/map/${data.user.id}`);
      toast.success("Your account has been created!");
      queryClient.invalidateQueries({ queryKey: ["authentication"] });
      signIn();
      enableButton();
    },
    onError: (err) => {
      toast.error(err?.message);
      enableButton();
    },
  });

  return { isUploading, createAccount };
}
export default useAuth;
