import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import useMainPageContext from "../../context/useMainPageContext";

function ChevronButton() {
  const { sideBarOpened, openSideBar, closeSideBar } = useMainPageContext();

  return (
    <button
      className={`absolute left-0 top-1/2 z-[999999] h-32 w-32 transition-all duration-300 hover:scale-[1.1]`}
      onMouseDown={() => {
        if (sideBarOpened) {
          closeSideBar();
        } else {
          openSideBar();
        }
      }}
    >
      {sideBarOpened ? (
        <ChevronLeftIcon className="text-slate-900" />
      ) : (
        <ChevronRightIcon className="text-slate-900" />
      )}
    </button>
  );
}

export default ChevronButton;
