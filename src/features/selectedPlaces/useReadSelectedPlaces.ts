import { useQuery } from "@tanstack/react-query";

import { readSelectedPlacesApi } from "../../services/apiSelectedPlaces";

function useReadSelectedPlaces(id: string | undefined) {
  const { data: selectedPlaces, isLoading: loadingPlaces } = useQuery({
    queryKey: ["selectedPlaces"],
    queryFn: () => readSelectedPlacesApi(id),
  });

  return { selectedPlaces, loadingPlaces };
}

export default useReadSelectedPlaces;
