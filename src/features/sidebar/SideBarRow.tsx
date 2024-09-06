import { HiEllipsisVertical, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { memo, useState } from "react";
import Button from "../../ui/Button";
import useMainPageContext from "../../context/useMainPageContext";
import Menus from "../../ui/Menus";
import useDeleteSelectedPlace from "../selectedPlaces/useDeleteSelectedPlace";
import { UseFormSetValue } from "react-hook-form";
import { PlaceTypes } from "../../features/sidebar/Aside";

type SideBarRowTypes = {
  placeInfo: {
    id: number;
    destination: string;
    description: string;
    userID: string;
    coords: string;
  };
  id: number;
  reactHookFormSetValue: UseFormSetValue<PlaceTypes>;
  setEditingSelectedPlaceID: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
};

function SideBarRow({
  placeInfo,
  id,
  reactHookFormSetValue,
  setEditingSelectedPlaceID,
}: SideBarRowTypes) {
  const {
    lockedId,
    routeLocked,
    closeSideBar,
    lockRoute,
    unlockRoute,
    openSideBarForm,
  } = useMainPageContext();

  const [openedDescription, setOpenedDescription] = useState(false);
  const navigate = useNavigate();
  const { deleteSelectedPlace } = useDeleteSelectedPlace();

  function handleFind() {
    if (routeLocked && id === lockedId) return unlockRoute();
    navigate(
      `/map/${placeInfo.userID}/?lat=${placeInfo.coords[0]}&lng=${placeInfo.coords[1]}`,
    );

    closeSideBar();
    lockRoute(id);
  }

  function handleEditPlace() {
    openSideBarForm();
    reactHookFormSetValue("description", placeInfo.description);
    reactHookFormSetValue("destination", placeInfo.destination);
    setEditingSelectedPlaceID(placeInfo.id);
  }

  return (
    <div className={`flex  flex-col   rounded-md bg-slate-700 p-5  `}>
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
            {lockedId === id && routeLocked ? "Unlock" : "LockIn"}
          </Button>

          <Menus.Menu>
            <Menus.Toggle id={String(id)}>
              <HiEllipsisVertical className="size-9" />
            </Menus.Toggle>
            <Menus.List id={String(id)}>
              <Menus.Button
                icon={<HiPencilSquare className="text-slate-400" />}
                onClick={handleEditPlace}
              >
                Edit
              </Menus.Button>
              <Menus.Button
                icon={<HiTrash className="text-slate-400" />}
                onClick={() => deleteSelectedPlace(placeInfo.id)}
              >
                Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </div>

      <motion.p
        className={`  overflow-hidden  break-words `}
        initial={{ height: 0, padding: 0, opacity: 0 }}
        animate={{
          opacity: openedDescription ? 1 : 0,
          minHeight: openedDescription ? "10rem" : 0,
          padding: openedDescription ? "1.25rem 0 0 0" : 0,
        }}
        transition={{ duration: 0.3 }}
        layout
      >
        {placeInfo.description
          ? placeInfo.description
          : "Description was not written."}
      </motion.p>
    </div>
  );
}

const MemoizedSideBarRow = memo(SideBarRow);

export default MemoizedSideBarRow;
export { MemoizedSideBarRow as SideBarRow };
