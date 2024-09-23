import supabase from "../supabase";

export async function getOrderById(orderId: number) {
  try {
    const { data, error } = await supabase
      .from("Orders") // Assuming your table is called "Orders"
      .select("*")
      .eq("id", orderId)
      .single();

    if (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }

    return data;
  } catch (err) {
    console.error("Error fetching order by ID:", err);
    return null;
  }
}
