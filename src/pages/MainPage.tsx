import Aside from "../components/MainPage/Aside";
import Map from "../components/MainPage/Map";

function MainPage() {
  return (
    <div className={` grid h-screen  grid-cols-[auto_1fr] overflow-hidden`}>
      <Aside />

      <Map />
    </div>
  );
}

export default MainPage;
