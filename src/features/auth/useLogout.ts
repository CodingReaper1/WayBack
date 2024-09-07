import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutApi } from "../../services/apiDatabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/", { replace: true });
    },
    onError: (err) => {
      toast.error(`Error: ${err}`);
      console.error(`Error: ${err}`);
    },
  });

  return { logout, isPending };
}

export default useLogout;
