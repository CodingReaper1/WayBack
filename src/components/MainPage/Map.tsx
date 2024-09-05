import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import L, { Map as LeafletMap } from "leaflet";
import "leaflet-routing-machine";
import toast from "react-hot-toast";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import { useCallback, useState } from "react";
import useGeoloacationData from "../../hooks/useGeoloacationData";
import useMapContext from "../../context/useMapContext";
import useMyPositionContext from "../../context/useMyPositionContext";
import useMainPageContext from "../../context/useMainPageContext";
import useGetRoute from "../../hooks/useGetRoute";
// import Fakecoords from "./Fakecoords";

function Map() {
  // const {
  //   routeLocked,
  //   sideBarOpened,
  //   openSideBar,
  //   openSideBarForm,
  //   closeSideBar,
  // } = useMainPageContext();
  // const { map, saveMap } = useMapContext();
  // const { myPosition } = useMyPositionContext();

  // const [searchParams] = useSearchParams();
  // const lat: string | null = searchParams?.get("lat");
  // const lng: string | null = searchParams?.get("lng");

  // const { id } = useParams();
  // const navigate = useNavigate();

  // const [heading, setHeading] = useState(0);
  // const [starterDeg, setStarterDeg] = useState(0);
  // useGeoloacationData(heading, setHeading);
  // useGetRoute();

  // const triangleIcon = L.divIcon({
  //   className: "",
  //   html: `
  //   <div class="flex items-center justify-center h-[12px] -rotate-90">
  //     <img src="/right-arrow.png" class="w-12 h-12" style="
  //       animation: spin 1s forwards ;
  //     " />
  //   </div>
  //   <style>
  //     @keyframes spin {
  //       from {
  //         transform: rotate(${starterDeg}deg);
  //       }
  //       to {
  //         transform: rotate(${heading ? heading : 0}deg);
  //       }
  //     }
  //   </style>
  //   `,
  // });

  // // useEffect(() => {
  // //   const timeout = setTimeout(() => {
  // //     setStarterDeg(heading ? heading : 0);
  // //   }, 1_000);

  // //   return () => clearTimeout(timeout);
  // // }, [heading]);

  // // For click event on map
  // function MapEvents() {
  //   useMapEvents({
  //     click(e) {
  //       if (routeLocked)
  //         return toast.error("Unlock to be able to add new locations");
  //       navigate(`/map/${id}/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
  //       openSideBarForm();
  //       openSideBar();
  //     },
  //   });

  //   return null;
  // }

  // // For centering map on user
  // const UpdateMapCenter = useCallback(
  //   ({ position }: { position: [number, number] }) => {
  //     if (!map || !position || !routeLocked) return;
  //     map.panTo(position, { animate: true, duration: 1 });
  //     return null;
  //   },
  //   // [myPosition, routeLocked, map],
  //   [routeLocked, map],
  // );

  const position: [number, number] = [51.505, -0.09];
  return (
    // <MapContainer
    //   // rotate={true}
    //   doubleClickZoom={false}
    //   center={myPosition}
    //   zoom={8}
    //   scrollWheelZoom={true}
    //   className="h-screen w-screen"
    //   // @ts-expect-error |||| typescript says whenReady doesnt have acces to any parameters () => void; but it has acces to map instance
    //   whenReady={(startMap: { target: LeafletMap }) => {
    //     saveMap(startMap.target);
    //   }}
    // >
    //   <button
    //     className={`absolute left-0 top-1/2 z-[999999] h-32 w-32 transition-all duration-300 hover:scale-[1.1]`}
    //     onMouseDown={() => {
    //       if (sideBarOpened) {
    //         closeSideBar();
    //       } else {
    //         openSideBar();
    //       }
    //     }}
    //   >
    //     {sideBarOpened ? (
    //       <ChevronRightIcon className="text-slate-900" />
    //     ) : (
    //       <ChevronLeftIcon className="text-slate-900" />
    //     )}
    //   </button>
    //   {/* <Fakecoords /> */}

    //   <UpdateMapCenter position={myPosition} />
    //   <MapEvents />
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
    //   />

    //   {!lat || !lng || (
    //     <Marker position={[+lat, +lng]}>
    //       {/* <Popup>
    //         <span className="text-2xl">Destination</span>
    //       </Popup> */}
    //       <Popup>
    //         A pretty CSS3 popup. <br /> Easily customizable.
    //       </Popup>
    //     </Marker>
    //   )}

    //   {/* <Marker position={myPosition} icon={triangleIcon}></Marker> */}
    // </MapContainer>
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
