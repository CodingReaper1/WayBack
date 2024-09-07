import Map from "../features/map/Map";
import SideBar from "../features/sidebar/SideBar";

function MainPage() {
  return (
    <div className={` grid h-screen  grid-cols-[auto_1fr] overflow-hidden`}>
      <SideBar />

      <Map />
    </div>
  );
}

export default MainPage;
