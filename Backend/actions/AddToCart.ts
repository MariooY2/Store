"use server"
import supabase from "../supabase";
import { revalidatePath } from "next/cache";
// Function to check if the item exists in the cart for the given email
export async function checkifItemexists({
  Item_id,
  email,
}: {
  Item_id: number;
  email: string | undefined;
}): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .from("Cart")
      .select("id, quantity")
      .eq("Item_id", Item_id)
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      console.error("Error checking item in cart:", error.message);
      return false;
    }

    return !!data;
  } catch (err) {
    console.error("Error checking if item exists in cart:", err);
    return false;
  }
}

// Function to add item to cart or update the quantity if it already exists
export const addToCart = async ({
  Item_id,
  quantity,
  email,
}: {
  Item_id: number;
  quantity: number;
  email: string | undefined;
}): Promise<void> => {
  if (!email) {
    console.error("User email is missing. Cannot add item to cart.");
    return;
  }

  try {
    // Check if the item already exists in the cart
    const { data: cartItem, error } = await supabase
      .from("Cart")
      .select("id, quantity")
      .eq("Item_id", Item_id)
      .eq("email", email)
      .single();

    if (error && error.code !== "PGRST116") {
      // If the error is not "row not found", log it
      console.error("Error checking item in cart:", error.message);
      return;
    }

    if (!cartItem) {
      // If the item does not exist, insert a new row
      const { data, error: insertError } = await supabase.from("Cart").insert([
        {
          Item_id: Item_id,
          quantity: quantity,
          email: email,
        },
      ]);

      if (insertError) {
        throw new Error(insertError.message);
      }

      console.log("Item successfully added to cart:", data);
    } else {
      // If the item exists, update the quantity
      const updatedQuantity = cartItem.quantity + quantity;

      const { data, error: updateError } = await supabase
        .from("Cart")
        .update({ quantity: updatedQuantity })
        .eq("Item_id", Item_id)
        .eq("email", email);

      if (updateError) {
        throw new Error(updateError.message);
      }

      console.log(`Item quantity updated to ${updatedQuantity}:`, data);
    }
  } catch (err) {
    console.error("Error adding/updating item in cart:", err);
  }
};

// Function to delete an item from the cart
export const deleteFromCart = async ({
  Item_id,
  email,
}: {
  Item_id: number;
  email: string | undefined;
}): Promise<void> => {
  if (!email) {
    console.error("User email is missing. Cannot delete item from cart.");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("Cart")
      .delete()
      .eq("Item_id", Item_id)
      .eq("email", email);

    if (error) {
      throw new Error(error.message);
    }  
    revalidatePath("/cart");

    console.log(
      `Item with ID ${Item_id} deleted successfully from cart:`,
      data
    );
  } catch (err) {
    console.error("Error deleting item from cart:", err);
  }
};
