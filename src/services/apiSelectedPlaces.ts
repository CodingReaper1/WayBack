import toast from "react-hot-toast";
import supabase from "./supabase";

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

type EditSelectedPlacesTypes = {
  editingSelectedPlaceID: number;
  destination: string;
  description: string;
};

export async function deleteSelectedPlaceApi(id: number) {
  const { error } = await supabase.from("selectedPlaces").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return null;
}

export async function readSelectedPlacesApi(id: string | undefined) {
  try {
    const { data: allSelectedPlaces, error } = await supabase
      .from("selectedPlaces")
      .select("*");

    if (error) throw new Error(error.message);

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
  } catch (err) {
    const error = err as Error;
    toast.error(`Error: ${error.message}`);
    console.error(`Error: ${error.message}`);
    return [];
  }
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

  if (error) throw new Error(error.message);

  return data;
}

export async function editSelectedPlaceApi({
  editingSelectedPlaceID,
  destination,
  description,
}: EditSelectedPlacesTypes) {
  const { data, error } = await supabase
    .from("selectedPlaces")
    .update({ destination: destination, description: description })
    .eq("id", editingSelectedPlaceID)
    .select();

  if (error) throw new Error(error.message);

  return data;
}
