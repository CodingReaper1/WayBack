import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logInApi } from "../services/apiDatabase";
import useLoginContext from "../context/useLoginContext";

function useLogIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { enableButton } = useLoginContext();

  const { isPending, mutate: logIn } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      logInApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      toast.success("Successfully logged in!");
      navigate(`/map/${user.user.id}`);
      enableButton();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Provided email or password is incorrect");
      enableButton();
    },
  });

  return { logIn, isPending };
}

export default useLogIn;
