import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";
import { LatLngBounds, Map as LeafletMap } from "leaflet";
// import "leaflet-routing-machine";

import useMapContext from "../../context/useMapContext";
import useMyPositionContext from "../../context/useMyPositionContext";
import useGetRoute from "./useGetRoute";
import useIcons from "./useIcons";
import UpdateMapCenter from "./UpdateMapCenter";
import ChevronButton from "./ChevronButton";
import MapEvents from "./MapEvents";
import Fakecoords from "./Fakecoords";
import useMainPageContext from "../../context/useMainPageContext";
// import useFindUserLocation from "./useFindUserLocation";

function Map() {
  const { saveMap } = useMapContext();
  const { myPosition } = useMyPositionContext();
  const { isMapEnabled } = useMainPageContext();

  const [searchParams] = useSearchParams();
  const lat: string | null = searchParams?.get("lat");
  const lng: string | null = searchParams?.get("lng");

  useGetRoute();
  // useFindUserLocation();
  const { mapPinIcon, myPositionIcon } = useIcons(myPosition);

  return (
    <MapContainer
      key={isMapEnabled ? "enabled" : "disabled"}
      doubleClickZoom={false}
      center={myPosition}
      zoom={8}
      maxZoom={19}
      minZoom={3}
      scrollWheelZoom={true}
      className={`h-screen w-screen ${!isMapEnabled ? "cursor-not-allowed" : ""}`}
      // @ts-expect-error |||| typescript says whenReady doesnt have acces to any parameters () => void; but it has acces to map instance
      whenReady={(startMap: { target: LeafletMap }) => {
        saveMap(startMap.target);
      }}
      maxBounds={new LatLngBounds([-90, -180], [90, 180])}
      maxBoundsViscosity={1.0}
      worldCopyJump={false}
    >
      <ChevronButton />
      <Fakecoords />

      <UpdateMapCenter myPosition={myPosition} />
      <MapEvents />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19} // Ensure max zoom is set properly
        minZoom={3}
      />
      {/* <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.fr/">OSM France</a>'
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        maxZoom={20}
      /> */}

      {!lat || !lng || (
        <Marker position={[+lat, +lng]} icon={mapPinIcon}>
          <Popup>
            <span className="text-2xl">Destination</span>
          </Popup>
        </Marker>
      )}

      <Marker position={myPosition} icon={myPositionIcon}></Marker>
    </MapContainer>
  );
}

export default Map;
