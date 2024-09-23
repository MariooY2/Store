import supabase from "../supabase";
import { currentUser } from "@clerk/nextjs/server";

interface Order {
  id: number;
  created_at: string;
  Products: any; // Adjust based on your product structure
  isPaid: boolean;
  Total: number;
  email: string;
}

export const fetchUserOrders = async (): Promise<Order[] | null> => {
  try {
    const user = await currentUser();
    if (!user) {
      console.error("User not logged in");
      return null;
    }

    // Extract user's email
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error("User email not found");
      return null;
    }

    // Fetch orders from the Orders table based on email
    const { data, error } = await supabase
      .from("Orders")
      .select("*")
      .eq("email", email)
      .eq("isPaid", true);

    if (error) {
      console.error("Error fetching user orders:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching user orders:", err);
    return null;
  }
};
