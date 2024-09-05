import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import SideBarRow from "./SideBarRow.js";
import Form from "../Form.js";
import Button from "../Button.js";
import NewFormRow from "../NewFormRow.js";
import NewInput from "../NewInput.js";
import useMainPageContext from "../../context/useMainPageContext.js";
import Spinner from "../Spinner.js";
import useCreateSelectedPlace from "../../hooks/useCreateSelectedPlace.js";
import useReadSelectedPlaces from "../../hooks/useReadSelectedPlaces.js";
import StartSelecting from "./StartSelecting.js";
import useLogout from "../../hooks/useLogout.js";
import Menus from "../Menus.js";
import { useState } from "react";
import useEditSelectedPlace from "../../hooks/useEditSelectedPlace.js";

export type PlaceTypes = {
  id: number;
  destination: string;
  description: string;
  userID: string;
  coords: string;
};

function Aside() {
  const {
    register,
    handleSubmit,
    // getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PlaceTypes>();

  const { id }: { id?: string } = useParams();
  const [searchParams] = useSearchParams();
  const lat: string | null = searchParams?.get("lat");
  const lng: string | null = searchParams?.get("lng");

  const { sideBarFormOpen, sideBarOpened, closeSideBar, closeSideBarForm } =
    useMainPageContext();
  const { logout } = useLogout();

  const { selectedPlaces, loadingPlaces } = useReadSelectedPlaces(id);
  const { createSelectedPlace } = useCreateSelectedPlace(reset);

  const { editSelectedPlace } = useEditSelectedPlace(reset);
  const [editingSelectedPlaceID, setEditingSelectedPlaceID] = useState<
    number | undefined
  >(undefined);

  async function onSubmit(formData: PlaceTypes) {
    if (!editingSelectedPlaceID)
      createSelectedPlace({ ...formData, lat, lng, id });

    if (editingSelectedPlaceID) {
      editSelectedPlace({ ...formData, editingSelectedPlaceID });
    }
    setEditingSelectedPlaceID(undefined);
  }

  return (
    <motion.aside
      className={`relative  flex flex-col gap-24 overflow-y-auto bg-slate-800  text-2xl   text-white`}
      initial={{ width: "36rem", padding: "2.5rem 2rem 2.5rem 2rem" }}
      animate={{
        width:
          window.innerWidth > 640
            ? sideBarOpened
              ? "36rem"
              : "0"
            : sideBarOpened
              ? "100vw"
              : "0",
        padding: sideBarOpened ? "2.5rem 2rem 2.5rem 2rem" : "0",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <Button type="mainpage/link" onClick={logout}>
          Log out
        </Button>
        <Button
          type="mainpage/find"
          className="sm:hidden"
          onClick={() => closeSideBar()}
        >
          Close sidebar
        </Button>
      </div>

      <div className=" flex h-screen  flex-col gap-6 overflow-auto p-2">
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={`${
            sideBarFormOpen
              ? `flex max-h-[50rem] flex-col gap-6 opacity-100`
              : `pointer-events-none max-h-0 opacity-0`
          }`}
          page="Mainpage"
        >
          <NewFormRow
            label="Destination name"
            error={errors?.destination?.message}
          >
            <NewInput
              type="text"
              id="destination"
              required={true}
              register={register}
              validate={(value: string) =>
                value.length < 15 ||
                "Destination name has to be less than 15 characters"
              }
            />
          </NewFormRow>

          <NewFormRow label="Description" error={errors?.description?.message}>
            <NewInput type="text" id="description" register={register} />
          </NewFormRow>

          <div className="flex gap-2 text-lg xxs:text-2xl xs:gap-5 xs:text-3xl">
            <Button type="mainpage">Save place</Button>
            <Button
              type="mainpage/cancelbtn"
              onClick={() => closeSideBarForm()}
            >
              Cancel
            </Button>
          </div>
        </Form>

        <Menus>
          {loadingPlaces ? (
            <Spinner type="big" center={true} />
          ) : !(selectedPlaces.length === 0) ? (
            selectedPlaces
              .slice()
              .reverse()
              .map((place: PlaceTypes, index: number) => (
                <SideBarRow
                  placeInfo={place}
                  key={index}
                  id={index}
                  reactHookFormSetValue={setValue}
                  setEditingSelectedPlaceID={setEditingSelectedPlaceID}
                />
              ))
          ) : (
            <StartSelecting />
          )}
        </Menus>
      </div>
    </motion.aside>
  );
}

export default Aside;
