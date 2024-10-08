import { useParams, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import SideBarRow from "./SideBarRow";
import Form from "../../ui/Form.js";
import Button from "../../ui/Button.js";
import NewFormRow from "./NewFormRow.js";
import NewInput from "./NewInput.js";
import useMainPageContext from "../../context/useMainPageContext.js";
import Spinner from "../../ui/Spinner.js";
import useCreateSelectedPlace from "../selectedPlaces/useCreateSelectedPlace";
import useReadSelectedPlaces from "../selectedPlaces/useReadSelectedPlaces.js";
import StartSelecting from "./StartSelecting.js";
import useLogout from "../auth/useLogout";
import Menus from "../../ui/Menus.js";
import { useState } from "react";
import useEditSelectedPlace from "../selectedPlaces/useEditSelectedPlace.js";
import { HiArrowLeftOnRectangle, HiCog8Tooth } from "react-icons/hi2";
import ButtonText from "../../ui/ButtonText";
import FlexBox from "../../ui/FlexBox";

export type PlaceTypes = {
  id: number;
  destination: string;
  description: string;
  userID: string;
  coords: string;
};

function SideBar() {
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

  const { sideBarOpened, closeSideBar, closeSideBarForm } =
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
      <Menus>
        <FlexBox className="justify-between">
          <Menus.Menu>
            <Menus.Toggle id="settings" rectX={-10} rectY={8}>
              <HiCog8Tooth className="size-10" />
            </Menus.Toggle>
            <Menus.List id="settings">
              <Menus.Button
                icon={
                  <HiArrowLeftOnRectangle className="size-8 text-slate-400" />
                }
                onClick={logout}
              >
                Log out
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>

          <ButtonText
            type="normal"
            className="sm:hidden"
            onClick={() => closeSideBar()}
          >
            Close sidebar
          </ButtonText>
        </FlexBox>

        <FlexBox className="h-screen  flex-col gap-6 overflow-auto p-2">
          <Form onSubmit={handleSubmit(onSubmit)} page="Mainpage">
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

            <NewFormRow
              label="Description"
              error={errors?.description?.message}
            >
              <NewInput type="text" id="description" register={register} />
            </NewFormRow>

            <FlexBox className="gap-2 text-lg xxs:text-2xl xs:gap-5 xs:text-3xl">
              <Button type="mainpage">Save place</Button>
              <Button
                type="mainpage/cancelbtn"
                onClick={() => closeSideBarForm()}
              >
                Cancel
              </Button>
            </FlexBox>
          </Form>

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
        </FlexBox>
      </Menus>
    </motion.aside>
  );
}

export default SideBar;
