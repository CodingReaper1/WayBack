import Aside from "../components/MainPage/Aside";
import Map from "../components/MainPage/Map";
import useMainPageContext from "../context/useMainPageContext";

function MainPage() {
  const { sideBarOpened } = useMainPageContext();

  return (
    <div
      className={`relative grid h-screen  overflow-hidden transition-all  duration-300 ${sideBarOpened ? "grid-cols-[36rem_1fr]" : "grid-cols-[0_1fr]"}`}
    >
      <Aside />

      <Map />
    </div>
  );
}

export default MainPage;
