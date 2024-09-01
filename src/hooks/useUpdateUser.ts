import { useMutation } from "@tanstack/react-query";
import { updateUserApi } from "../services/apiDatabase";

function useUpdateUser() {
  const { mutate } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: updateUserApi,
  });

  return { mutate };
}

export default useUpdateUser;
