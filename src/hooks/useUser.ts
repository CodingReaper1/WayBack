import { useQuery } from "@tanstack/react-query";

import { getCurrentUserApi } from "../services/apiDatabase";

export function useUser() {
  const {
    isLoading,
    data: user,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUserApi,
  });

  return {
    isLoading,
    user,
    isAuthenticated: user?.role === "authenticated",
    refetch,
  };
}
