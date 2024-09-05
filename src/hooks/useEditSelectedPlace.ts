import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editSelectedPlaceApi } from "../services/apiSelectedPlaces";
import toast from "react-hot-toast";
import useMainPageContext from "../context/useMainPageContext";
import { UseFormReset } from "react-hook-form";
import { PlaceTypes } from "../components/MainPage/Aside";

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
    },
  });

  return { editSelectedPlace };
}

export default useEditSelectedPlace;
