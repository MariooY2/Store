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

export const deleteCartItems = async (): Promise<boolean> => {
  try {
    const user = await currentUser();
    if (!user) {
      console.error("User not logged in");
      return false;
    }

    // Extract the user's email
    const email = user.primaryEmailAddress?.emailAddress;
    if (!email) {
      console.error("User email not found");
      return false;
    }

    // Delete all cart items for the user based on email
    const { error } = await supabase
      .from("Cart")
      .delete()
      .eq("email", email);

    if (error) {
      console.error("Error deleting cart items:", error.message);
      return false;
    }

    console.log("Cart items successfully deleted for user:", email);
    return true;
  } catch (err) {
    console.error("Unexpected error deleting cart items:", err);
    return false;
  }
};