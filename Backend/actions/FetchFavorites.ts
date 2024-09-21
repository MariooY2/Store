"use server";
import supabase from "../supabase";
import { currentUser } from "@clerk/nextjs/server";


interface Favorite {
  id: number;
  created_at: string;
  Item_id: number;
  email: string;
  favorite: boolean;
}

interface Product {
  id: number;
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  clerkId: string;
}

export const getFavoritedProducts = async (): Promise<Product[] > => {
  try {
    // Get the current logged-in user
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

    // Fetch all favorited items for the user
    const { data: favorites, error: favoritesError } = await supabase
      .from("favorites")
      .select("Item_id")
      .eq("email", email)
      .eq("favorite", true);

    if (favoritesError) {
      throw new Error(favoritesError.message);
    }

    if (!favorites || favorites.length === 0) {
      console.log("No favorites found for this user.");
      return [];
    }

    // Extract all Item_ids from the favorites
    const itemIds = favorites.map(fav => fav.Item_id);

    // Fetch product details for each favorite item
    const { data: products, error: productsError } = await supabase
      .from("Products")
      .select("*")
      .in("id", itemIds); // Use the array of Item_ids to fetch products

    if (productsError) {
      throw new Error(productsError.message);
    }

    return products || [];
  } catch (err) {
    console.error("Error fetching favorited products:", err);
    return [];
  }
};
