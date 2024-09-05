import L from "leaflet";
import useGeoloacationData from "./useGeoloacationData";
import { useEffect, useState } from "react";

function useIcons() {
  const [heading, setHeading] = useState(0);
  const [starterDeg, setStarterDeg] = useState(0);
  useGeoloacationData(heading, setHeading);

  // Had to do something like this becouse i couldnt use jsx

  const mapPinIcon = L.divIcon({
    className: "",
    html: `
       <img src="/mapPin.png" class="w-14 h-14 transform -translate-y-11 -translate-x-4 "  />
    `,
  });

  const myPositionIcon = L.divIcon({
    className: "",
    html: `
      <div class="flex items-center justify-center h-[12px] -rotate-90">
        <img src="/right-arrow.png" class="w-12 h-12" style="animation: spin 1s forwards;" />
      </div>
      <style>
        @keyframes spin {
          from {
            transform: rotate(${starterDeg}deg);
          }
          to {
            transform: rotate(${heading ? heading : 0}deg);
          }
        }
      </style>
    `,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarterDeg(heading ? heading : 0);
    }, 1_000);

    return () => clearTimeout(timeout);
  }, [heading]);

  return { mapPinIcon, myPositionIcon };
}

export default useIcons;
