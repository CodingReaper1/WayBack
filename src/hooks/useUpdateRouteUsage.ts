import { useMutation } from "@tanstack/react-query";
import { updateRouteUsageApi } from "../services/apiRouteUsage";

function useUpdateRouteUsage() {
  const { mutate: updateRouteUsage } = useMutation({
    mutationFn: updateRouteUsageApi,
  });

  return { updateRouteUsage };
}

export default useUpdateRouteUsage;
