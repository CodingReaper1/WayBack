import toast from "react-hot-toast";

import { useEffect } from "react";
import useMyPositionContext from "../context/useMyPositionContext";
import useMainPageContext from "../context/useMainPageContext";

function useGeoloacationData(
  heading: number,
  setHeading: React.Dispatch<React.SetStateAction<number>>,
) {
  const { changeMyPosition, myPosition } = useMyPositionContext();
  const { disableMap, isMapEnabled } = useMainPageContext();

  useEffect(() => {
    const geoWatch = navigator.geolocation.watchPosition(
      (position) => {
        if (!isMapEnabled) return;
        if (
          position.coords.latitude !== myPosition[0] ||
          position.coords.longitude !== myPosition[1]
        )
          changeMyPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);

        console.log(position);

        if (position.coords.heading && position.coords.heading !== heading)
          setHeading(position.coords.heading);
      },
      (error) => {
        console.error("Error getting current position:", error);
        toast.error(`Location Error: ${error.message}`);
        if (error.message === "User denied Geolocation") disableMap();
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );

    return () => navigator.geolocation.clearWatch(geoWatch);
  }, [
    setHeading,
    heading,
    myPosition,
    changeMyPosition,
    disableMap,
    isMapEnabled,
  ]);
  return null;
}

export default useGeoloacationData;
