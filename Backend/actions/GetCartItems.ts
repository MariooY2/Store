import supabase from "../supabase";
import { currentUser } from "@clerk/nextjs/server";
interface CartItem {
  id: number;
  Item_id: number;
  quantity: number;
  email: string;
}

export const getCartItems = async (): Promise<CartItem[] | null> => {
  try {
    const user = await currentUser();
    if (!user) {
      console.error("User not logged in");
      return [];
    }

    // Extract the user's email
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error("User email not found");
      return [];
    }
    const { data, error } = await supabase
      .from("Cart")
      .select()
      .eq("email", email);

    if (error) {
      console.error("Error fetching cart items:", error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.error("Unexpected error fetching cart items:", err);
    return null;
  }
};
