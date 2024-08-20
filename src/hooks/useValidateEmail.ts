import { useQuery } from "@tanstack/react-query";

import validateEmailExistsApi from "../services/apiValidateEmail";

function useValidateEmail(email: string) {
  const {
    isLoading: isValidatingEmail,
    // error,
    refetch: validateEmail,
  } = useQuery({
    queryKey: ["verifyEmail"],
    queryFn: () => validateEmailExistsApi(email),
    enabled: false,
  });

  return { isValidatingEmail, validateEmail };
}

export default useValidateEmail;
