import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";

import { editSelectedPlaceApi } from "../../services/apiSelectedPlaces";
import useMainPageContext from "../../context/useMainPageContext";
import { PlaceTypes } from "../sidebar/SideBar";

function useEditSelectedPlace(reset: UseFormReset<PlaceTypes>) {
  const queryClient = useQueryClient();
  const { closeSideBarForm } = useMainPageContext();

  const { mutate: editSelectedPlace } = useMutation({
    mutationFn: editSelectedPlaceApi,
    onSuccess: () => {
      toast.success("Succesfully edited place!");

      reset();
      closeSideBarForm();
      queryClient.invalidateQueries({
        queryKey: ["selectedPlaces"],
      });
    },
    onError: (err) => {
      toast.error(`Error: ${err}`);
      console.error(`Error: ${err}`);
    },
  });

  return { editSelectedPlace };
}

export default useEditSelectedPlace;
