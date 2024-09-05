import useMainPageContext from "../../context/useMainPageContext";
import useMapContext from "../../context/useMapContext";

function UpdateMapCenter({ myPosition }: { myPosition: [number, number] }) {
  const { map } = useMapContext();
  const { routeLocked } = useMainPageContext();

  if (!map || !myPosition || !routeLocked) return;
  map.panTo(myPosition, { animate: true, duration: 1 });
  return null;
}

export default UpdateMapCenter;
