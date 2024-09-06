import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSelectedPlaceApi } from "../../services/apiSelectedPlaces";
import toast from "react-hot-toast";

function useDeleteSelectedPlace() {
  const queryClient = useQueryClient();

  const { mutate: deleteSelectedPlace } = useMutation({
    mutationFn: deleteSelectedPlaceApi,
    onSuccess: () => {
      toast.success("Place succesfully deleted");

      queryClient.invalidateQueries({ queryKey: ["selectedPlaces"] });
    },
    onError: (err) => {
      toast.error(`Error: ${err}`);
    },
  });

  return { deleteSelectedPlace };
}

export default useDeleteSelectedPlace;
