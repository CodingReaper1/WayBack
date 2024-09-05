import { useMapEvents } from "react-leaflet";
import { useNavigate, useParams } from "react-router-dom";
import useMainPageContext from "../../context/useMainPageContext";
import toast from "react-hot-toast";

function MapEvents() {
  const { routeLocked, openSideBar, openSideBarForm } = useMainPageContext();
  const { id } = useParams();
  const navigate = useNavigate();

  useMapEvents({
    click(e) {
      if (routeLocked)
        return toast.error("Unlock to be able to add new locations");
      navigate(`/map/${id}/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      openSideBarForm();
      openSideBar();
    },
  });

  return null;
}

export default MapEvents;
