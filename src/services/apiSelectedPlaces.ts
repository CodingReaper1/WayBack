import supabase from "./supabase";

export async function deleteSelectedPlaceApi() {
  // const { error } = await supabase
  //   .from("selectedPlaces")
  //   .delete()
  //   .eq("some_column", "someValue");
}

type PlaceTypes = {
  userID: string;
  destination: string;
  description: string;
  coords: string; // JSON string before parsing
  id?: string;
  lat: string | null;
  lng: string | null;
};

type ParsedTypes = {
  userID: string;
  coords: [number, number];
};

export async function readSelectedPlacesApi(id: string | undefined) {
  const { data: allSelectedPlaces, error } = await supabase
    .from("selectedPlaces")
    .select("*");

  const accountSelectedPlaces = allSelectedPlaces?.filter(
    (place: PlaceTypes) => place.userID === id,
  );

  const selectedPlacesParsed = accountSelectedPlaces?.reduce(
    (acc: ParsedTypes[], place: PlaceTypes) => {
      acc.push({ ...place, coords: JSON.parse(place.coords) });
      return acc;
    },
    [],
  );

  return selectedPlacesParsed;
}

export async function createSelectedPlaceApi({
  destination,
  description,
  id: userID,
  lat,
  lng,
}: PlaceTypes) {
  const coords = JSON.stringify([lat, lng]);

  const { data, error } = await supabase
    .from("selectedPlaces")
    .insert({ userID, coords, description, destination })
    .select();
  // console.log(error);
  return null;
}
