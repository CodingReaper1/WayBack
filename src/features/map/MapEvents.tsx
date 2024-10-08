import { useMapEvents } from "react-leaflet";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import useMainPageContext from "../../context/useMainPageContext";

function MapEvents() {
  const { routeLocked, openSideBar, openSideBarForm, isMapEnabled } =
    useMainPageContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      if (routeLocked) return toast.error("Unlock route to find new locations");
      if (!isMapEnabled)
        return toast.error("To use map enable your location and refresh page");

      navigate(`/map/${id}/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      openSideBarForm();
      openSideBar();
    },
    drag(e) {
      if (!isMapEnabled) {
        e.target.dragging.disable(); 
      }
    },
  });

  return null;
}

export default MapEvents;
