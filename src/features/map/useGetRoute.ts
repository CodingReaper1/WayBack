import {
  //  useMutation,
  useQuery,
  //  useQueryClient
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";
import polylineEncoded from "polyline-encoded";
import toast from "react-hot-toast";

import useMapContext from "../../context/useMapContext";
import useMyPositionContext from "../../context/useMyPositionContext";
import useUpdateRouteUsage from "../routeUsage/useUpdateRouteUsage";
import getRouteApi from "../../services/apiGetRoute";

function useGetRoute() {
  const [searchParams] = useSearchParams();
  const lat: string | null = searchParams?.get("lat");
  const lng: string | null = searchParams?.get("lng");
  const { updateRouteUsage } = useUpdateRouteUsage();

  const { map } = useMapContext();
  const { myPosition } = useMyPositionContext();

  const { refetch: refetchMapRoute } = useQuery({
    queryKey: ["updateRoute", lat, lng, myPosition[0], myPosition[1]],
    queryFn: async () => {
      try {
        const data = await getRouteApi({ myPosition, lat, lng });
        if (!data || map === null) return {};

        if (data?.message) throw new Error(`Error: ${data?.message}`);

        const routePoints = polylineEncoded.decode(data.paths[0].points);

        if (map.routePolyline) map.removeLayer(map.routePolyline);
        const routePolyline = L.polyline(routePoints, { color: "blue" }).addTo(
          map,
        );

        map.routePolyline = routePolyline;
        updateRouteUsage();

        return data.paths[0];
      } catch (err) {
        const error = err as Error;
        toast.error(`Error: ${error.message}`);
        console.error(`Error: ${error.message}`);
        return {};
      }
    },
  });

  return { refetchMapRoute };
}

export default useGetRoute;
