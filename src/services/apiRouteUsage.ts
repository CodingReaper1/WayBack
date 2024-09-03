import supabase from "./supabase";

export async function readRouteUsageApi(startDate: string) {
  const { data: routeUsage, error } = await supabase
    .from("routeUsage")
    .select("created_at,usageDaily")
    .gte("created_at", startDate);

  if (error) throw new Error(`Error: ${error.message}`);

  return routeUsage;
}

export async function updateRouteUsageApi() {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();
  const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();

  const { data: routeUsage, error } = await supabase
    .from("routeUsage")
    .select("*")
    .gte("created_at", startOfDay)
    .lte("created_at", endOfDay);

  if (error) throw new Error(`Error: ${error.message}`);

  if (routeUsage?.length === 0) {
    const { error: errorInserting } = await supabase
      .from("routeUsage")
      .insert([{ usageDaily: 1 }])
      .select();

    if (errorInserting) throw new Error(`Error: ${errorInserting.message}`);
  } else {
    const { error: errorUpdating } = await supabase
      .from("routeUsage")
      .update({ usageDaily: routeUsage[0].usageDaily + 1 })
      .eq("id", routeUsage[0].id)
      .select();

    if (errorUpdating) throw new Error(`Error: ${errorUpdating.message}`);
  }

  return routeUsage;
}
