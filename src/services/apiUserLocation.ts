import Apiip from "apiip.net";

export async function findUserLocationApi(): Promise<[number, number]> {
  // @ts-expect-error |||| doesnt seem like error its just annyoing
  const apiip = Apiip(import.meta.env.VITE_APIIP_API_KEY);

  const data = await apiip.getLocation();
  console.log(data);

  return [data.latitude, data.longitude];
}
