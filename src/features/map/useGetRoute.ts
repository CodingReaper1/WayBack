import {
  //  useMutation,
  useQuery,
  //  useQueryClient
} from "@tanstack/react-query";
import updateRouteApi from "../../services/apiFetchRoute";
import { useSearchParams } from "react-router-dom";
import L from "leaflet";
import polylineEncoded from "polyline-encoded";
import toast from "react-hot-toast";

import useMapContext from "../../context/useMapContext";
import useMyPositionContext from "../../context/useMyPositionContext";
import useUpdateRouteUsage from "../routeUsage/useUpdateRouteUsage";
// import { useEffect } from "react";

// function useGetRoute() {
//   const [searchParams] = useSearchParams();
//   const lat = searchParams?.get("lat");
//   const lng = searchParams?.get("lng");
//   const queryClient = useQueryClient();

//   const { map } = useMapContext();
//   const { mapIsReady } = useMapReadyContext();
//   const { myPosition } = useMyPositionContext();

//   const { mutate: refetchMapRoute } = useMutation({
//     // mutationKey: ["u", myPosition],
//     mutationFn: () => updateRoute(myPosition, lat, lng, mapIsReady),
//     onSuccess: (data) => {

//       const routePoints = polylineEncoded.decode(data.paths[0].points);

//       if (map.routePolyline) map.removeLayer(map.routePolyline);
//       const routePolyline = L.polyline(routePoints, { color: "red" }).addTo(
//         map,
//       );

//       map.routePolyline = routePolyline;

//       // map.fitBounds(routePolyline.getBounds());
//       queryClient.invalidateQueries({
//         queryKey: ["u", myPosition],
//       });
//     },
//     onError: (err) => {
//       toast.error(err.message);
//     },
//     // refetchInterval: 1_000,
//     // refetchIntervalInBackground: true, // Ensure it refetches even if the tab is in the background
//     // refetchOnWindowFocus: true, // Refetch when the window gains focus
//     refetchOnReconnect: true, // Refetch when the network reconnects
//     cacheTime: 0, // Minimum cache time to ensure it doesn't become inactive
//   });

//   // useEffect(() => {
//   //   if (myPosition && mapIsReady) {
//   //     refetchMapRoute();
//   //   }
//   // }, [myPosition, mapIsReady, refetchMapRoute]);

//   return { refetchMapRoute };
// }

// export default useGetRoute;

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
        const data = await updateRouteApi({ myPosition, lat, lng });
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
        toast.error(error.message);
        return {};
      }
    },
  });

  return { refetchMapRoute };
}

export default useGetRoute;
