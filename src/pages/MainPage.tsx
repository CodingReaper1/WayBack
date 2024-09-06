import Aside from "../features/sidebar/Aside";
import Map from "../features/map/Map";

function MainPage() {
  return (
    <div className={` grid h-screen  grid-cols-[auto_1fr] overflow-hidden`}>
      <Aside />

      <Map />
    </div>
  );
}

export default MainPage;
