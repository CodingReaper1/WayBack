type UpdateRouteTypes = {
  myPosition: [number, number];
  lat: string | null;
  lng: string | null;
  mapIsReady?: boolean;
};

async function updateRouteApi({
  myPosition,
  lat,
  lng,
}: UpdateRouteTypes): Promise<
  | {
      paths: { points: string }[];
      message?: string;
    }
  | undefined
> {
  if (lat === null || lng === null) return;
  if (!lat && !lng) return;

  const API_KEY = import.meta.env.VITE_GRAPHOPPER_API_KEY;

  const query = new URLSearchParams({
    key: API_KEY,
  });

  const resp = await fetch(`https://graphhopper.com/api/1/route?${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile: "car",
      points: [
        [myPosition[1], myPosition[0]],
        [+lng, +lat],
      ],
    }),
  });

  // console.log(resp);
  // if (!resp.ok) throw new Error("Problem with fetching route");

  const data = await resp.json();
  // console.log(data);

  // if (data?.message) throw new Error(`Error: ${data?.message}`);

  //(!data.paths && data.paths.length > 0 && data.paths[0].points)

  return data;
}

export default updateRouteApi;

// const updateRoute = useCallback(() => {
//   if (map.routeControl) {
//     map.removeControl(map.routeControl);
//   }

//   const routeControl = L.Routing.control({
//     waypoints: [L.latLng(myPosition[0], myPosition[1]), L.latLng(lat, lng)],
//     routeWhileDragging: false, // Disable dragging while routing
//     draggableWaypoints: false, // Disable dragging waypoints
//     createMarker: function () {
//       return null;
//     },
//     router: L.Routing.osrmv1({
//       serviceUrl: "https://router.project-osrm.org/route/v1",
//     }),
//     fitSelectedRoutes: false,
//     showAlternatives: false,
//   }).addTo(map);
//   // I HAVE TO CREATE THIS SIDE EFFECT I COULDNT FIND HOW TO DISABLE INSTRUCTUONS OTHERWISE
//   const instructionsControl = document.querySelector(
//     ".leaflet-routing-container",
//   );
//   if (instructionsControl) {
//     instructionsControl.style.display = "none";
//   }

//   map.routeControl = routeControl;
// }, [lat, lng, myPosition, map]);

// const query = new URLSearchParams({
//   key: import.meta.env.VITE_GRAPHOPPER_API_KEY,
// }).toString();

// const jobId =
//   "wfoiajwfop_2309238jwfhwoifwofi_23894u2iofin2fsfa9w8fhasfhawe89f7hgiu";
// console.log(jobId);
// const resp = await fetch(
//   `https://graphhopper.com/api/1/vrp/solution/${jobId}?${query}`,
//   { method: "GET" },
// );

// const data = await resp.text();
// console.log(data);
