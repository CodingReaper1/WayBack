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

type PlaceTypes = {
  destination: string;
  description: string;
  userID: string;
  coords: string;
};

function Aside() {
  const { sideBarFormOpen, sideBarOpened, closeSideBar, closeSideBarForm } =
    useMainPageContext();
  const { logout, isPending } = useLogout();

  const {
    register,
    handleSubmit,
    // getValues,
    reset,
    formState: { errors },
  } = useForm<PlaceTypes>();
  const { id }: { id?: string } = useParams();

  const [searchParams] = useSearchParams();
  const lat: string | null = searchParams?.get("lat");
  const lng: string | null = searchParams?.get("lng");

  const { selectedPlaces, loadingPlaces } = useReadSelectedPlaces(id);

  const { createSelectedPlace } = useCreateSelectedPlace(reset);

  async function onSubmit(formData: PlaceTypes) {
    createSelectedPlace({ ...formData, lat, lng, id });
  }

  return (
    <motion.aside
      className={`relative  flex flex-col gap-24 overflow-y-auto bg-slate-800  text-2xl   text-white`}
      initial={{ width: "36rem", padding: "2.5rem 2.4rem 2.5rem 2.4rem" }}
      animate={{
        width:
          window.innerWidth > 640
            ? sideBarOpened
              ? "36rem"
              : "0"
            : sideBarOpened
              ? "100vw"
              : "0",
        padding: sideBarOpened ? "2.5rem 2.4rem 2.5rem 2.4rem" : "0",
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between">
        <Button type="mainpage/link" onClick={logout}>
          Log out
        </Button>
        <Button
          type="mainpage/link"
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
              : `max-h-0 opacity-0`
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

          <div className="flex gap-5">
            <Button type="mainpage">Save place</Button>
            <Button
              type="mainpage/cancelbtn"
              onClick={() => closeSideBarForm()}
            >
              Cancel
            </Button>
          </div>
        </Form>

        {loadingPlaces ? (
          <Spinner type="big" center={true} />
        ) : !(selectedPlaces.length === 0) ? (
          selectedPlaces
            .slice()
            .reverse()
            .map((place: PlaceTypes, index: number) => (
              <SideBarRow placeInfo={place} key={index} id={index} />
            ))
        ) : (
          <StartSelecting />
        )}
      </div>
    </motion.aside>
  );
}

export default Aside;
