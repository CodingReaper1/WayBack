import { useMutation } from "@tanstack/react-query";
import { updateUserApi } from "../../services/apiDatabase";

function useUpdateUser() {
  const { mutate } = useMutation({
    mutationFn: updateUserApi,
  });

  return { mutate };
}

export default useUpdateUser;
