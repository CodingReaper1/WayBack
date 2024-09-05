import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { UseFormReset } from "react-hook-form";

import { createSelectedPlaceApi } from "../services/apiSelectedPlaces";
import useMainPageContext from "../context/useMainPageContext";
import { PlaceTypes } from "../components/MainPage/Aside";

function useCreateSelectedPlace(reset: UseFormReset<PlaceTypes>) {
  const { closeSideBarForm } = useMainPageContext();
  const queryClient = useQueryClient();

  const { mutate: createSelectedPlace } = useMutation({
    mutationFn: createSelectedPlaceApi,
    onSuccess: () => {
      toast.success("New route has been saved!");

      closeSideBarForm();
      reset();
      queryClient.invalidateQueries({
        queryKey: ["selectedPlaces"],
      });
    },
  });

  return { createSelectedPlace };
}
export default useCreateSelectedPlace;
