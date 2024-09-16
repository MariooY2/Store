"use server";
import supabase from "../supabase";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
export async function favoriteAdder(productId: number) {
  const user = await currentUser();

  if (!user) {
    console.error("User not logged in");
    return;
  }

  // Retrieve the user's email
  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    console.error("User email not found");
    return;
  }

  // Check if the item is already in the favorites
  const { data: favoriteData, error: favoriteError } = await supabase
    .from("favorites")
    .select("favorite")
    .eq("email", email)
    .eq("Item_id", productId)
    .single(); // We expect a single entry for a user and a product

  if (favoriteError && favoriteError.code !== "PGRST116") {
    // Ignore "not found" errors
    console.error("Error fetching favorite:", favoriteError);
    return;
  }
  revalidatePath("/");
  revalidatePath("/products");
  if (favoriteData) {
    // If the product is already in the favorites, toggle the favorite status
    const newFavoriteStatus = !favoriteData.favorite;
    const { data, error } = await supabase
      .from("favorites")
      .update({ favorite: newFavoriteStatus })
      .eq("email", email)
      .eq("Item_id", productId)
      .select();

    if (error) {
      console.error("Error updating favorite status:", error);
    } else {
      console.log(`Favorite status updated to ${newFavoriteStatus}:`, data);
    }
  } else {
    // If the product is not in the favorites, insert it as a favorite
    const { data, error } = await supabase
      .from("favorites")
      .insert([{ email: email, Item_id: productId, favorite: true }])
      .select();

    if (error) {
      console.error("Error inserting favorite:", error);
    } else {
      console.log("Favorite added:", data);
    }
  }
}
export async function getFeaturedByEmailAndProductId(productId: number) {
  const user = await currentUser();

  if (!user) {
    console.error("User not logged in");
    return;
  }

  // Retrieve the user's email
  const email = user.primaryEmailAddress?.emailAddress;

  if (!email) {
    console.error("User email not found");
    return;
  }

  // Query the 'favorites' table by email and productId, and filter for featured items
  const { data, error } = await supabase
    .from("favorites")
    .select()
    .eq("email", email)
    .eq("Item_id", productId)
    .limit(1);

  if (error) {
    console.error("Error fetching featured item:", error);
    return null;
  }

  if (data && data.length > 0) {
    const isFavorite = data[0].favorite;
    console.log(`Item is ${isFavorite ? "a favorite" : "not a favorite"}`);
    return isFavorite;
  } else {
    console.log("No featured item found for this user and product.");
    return null;
  }
}
