import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";
import { Map as LeafletMap } from "leaflet";
import "leaflet-routing-machine";

import useMapContext from "../../context/useMapContext";
import useMyPositionContext from "../../context/useMyPositionContext";
import useGetRoute from "../../hooks/useGetRoute";
import useIcons from "../../hooks/useIcons";
import UpdateMapCenter from "./UpdateMapCenter";
import ChevronButton from "./ChevronButton";
import MapEvents from "./MapEvents";
// import Fakecoords from "./Fakecoords";

function Map() {
  const { saveMap } = useMapContext();
  const { myPosition } = useMyPositionContext();

  const [searchParams] = useSearchParams();
  const lat: string | null = searchParams?.get("lat");
  const lng: string | null = searchParams?.get("lng");

  useGetRoute();
  const { mapPinIcon, myPositionIcon } = useIcons();

  return (
    <MapContainer
      // rotate={true}
      doubleClickZoom={false}
      center={myPosition}
      zoom={8}
      scrollWheelZoom={true}
      className="h-screen w-screen"
      // @ts-expect-error |||| typescript says whenReady doesnt have acces to any parameters () => void; but it has acces to map instance
      whenReady={(startMap: { target: LeafletMap }) => {
        saveMap(startMap.target);
      }}
    >
      <ChevronButton />
      {/* <Fakecoords /> */}

      <UpdateMapCenter myPosition={myPosition} />
      <MapEvents />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
      />

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
