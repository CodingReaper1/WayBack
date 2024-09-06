import { useQuery } from "@tanstack/react-query";
import { findUserLocationApi } from "../../services/apiUserLocation";
// import useMyPositionContext from "../../context/useMyPositionContext";

function useFindUserLocation() {
  // const { changeMyPosition, myPosition } = useMyPositionContext();

  // const { data } = useQuery({
  //   queryKey: ["findUserLocation"],
  //   queryFn: async () => {
  //     const data = await findUserLocationApi();
  //     // changeMyPosition(data);
  //     return {};
  //   },
  //   // refetchIntervalInBackground: true,
  //   // refetchInterval: 1000,
  // });
  useQuery({
    queryKey: ["findUserLocation"],
    queryFn: findUserLocationApi,
  });

  return;
}

export default useFindUserLocation;
