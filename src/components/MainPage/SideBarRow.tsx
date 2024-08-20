import { HiEllipsisVertical } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import { memo, useState } from "react";
import Button from "../Button";
import SmallModal from "../SmallModal";
import Overlay from "../Overlay";
import useMainPageContext from "../../context/useMainPageContext";

type SideBarRowTypes = {
  placeInfo: {
    destination: string;
    description: string;
    userID: string;
    coords: string;
  };
  id: number;
};

function SideBarRow({ placeInfo, id }: SideBarRowTypes) {
  const {
    smallModalOpened,
    openId,
    lockedId,
    routeLocked,
    openModal,
    closeSideBar,
    lockRoute,
    unlockRoute,
  } = useMainPageContext();

  const [openedDescription, setOpenedDescription] = useState(false);
  const [smallModalPosition, setSmallModalPosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  function handleEllipsis(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLElement;
    const button = target.closest("button");
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setSmallModalPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });

    openModal(id);
  }

  function handleFind() {
    if (routeLocked && id === lockedId) return unlockRoute();
    navigate(
      `/map/${placeInfo.userID}/?lat=${placeInfo.coords[0]}&lng=${placeInfo.coords[1]}`,
    );

    closeSideBar();
    lockRoute(id);
  }

  function handleDeletePlace() {}
  function handleEditPlace() {}

  return (
    <div
      className={`flex  flex-col   rounded-md bg-zinc-700 p-5  transition-all`}
    >
      <div className="relative flex justify-between">
        <h2
          className=" cursor-pointer content-center  overflow-hidden text-3xl "
          onClick={() => setOpenedDescription(!openedDescription)}
        >
          {placeInfo.destination}
        </h2>
        <div className="flex gap-3">
          <Button
            type="mainpage/find"
            className={lockedId === id && routeLocked ? "text-red-600" : ""}
            onClick={handleFind}
          >
            {lockedId === id && routeLocked ? "Unlock" : "Find"}
          </Button>

          <button
            className=" cursor-pointer rounded-md p-2 transition-all duration-300 hover:bg-zinc-600"
            onClick={handleEllipsis}
          >
            <HiEllipsisVertical className="size-9" />
          </button>
        </div>

        {smallModalOpened && openId === id && (
          <>
            <Overlay />
            <SmallModal smallModalPosition={smallModalPosition}>
              <Button type="mainpage/link" onClick={handleDeletePlace}>
                Delete
              </Button>
              <Button type="mainpage/link" onClick={handleEditPlace}>
                Edit
              </Button>
            </SmallModal>
          </>
        )}
      </div>

      <p
        className={`  overflow-hidden  duration-500 ${
          openedDescription ? "max-h-96 pt-5 opacity-100" : " max-h-0 opacity-0"
        }`}
      >
        {placeInfo.description}
      </p>
    </div>
  );
}

const MemoizedSideBarRow = memo(SideBarRow);

export default MemoizedSideBarRow;
export { MemoizedSideBarRow as SideBarRow };
