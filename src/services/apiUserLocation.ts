import Apiip from "apiip.net";
import toast from "react-hot-toast";

export async function findUserLocationApi(): Promise<[number, number]> {
  try {
    // @ts-expect-error |||| doesnt seem like error its just annyoing
    const apiip = Apiip(import.meta.env.VITE_APIIP_API_KEY);

    const data = await apiip.getLocation();
    console.log(data);

    return [data.latitude, data.longitude];
  } catch (err) {
    const error = err as Error;
    toast.error(error.message);
    return [42.05337156043361, 43.73107910156251];
  }
}
