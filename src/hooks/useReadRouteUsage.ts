import { useQuery } from "@tanstack/react-query";
import { readRouteUsageApi } from "../services/apiRouteUsage";
import { subDays } from "date-fns";

function useReadRouteUsage(filterValue: string) {
  const startDate = subDays(new Date(), +filterValue - 1)
    .toISOString()
    .split("T")[0];

  const { data: readRouteUsage } = useQuery({
    queryKey: ["routeUsage", filterValue],
    queryFn: () => readRouteUsageApi(startDate),
  });

  return { readRouteUsage };
}

export default useReadRouteUsage;
