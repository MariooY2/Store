import { SupabaseClient, PostgrestError } from "@supabase/supabase-js";
import supabase from "../supabase";

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

export default async function FetchItems(
  partialMatch: string = "",
  searchBy: string = "name"
): Promise<Product[] | null> {
  let query = supabase.from("Products").select("*");

  // Check if searching by "id" (which is numeric), use `.eq()` for exact matching
  if (searchBy === "id") {
    const idValue = parseInt(partialMatch, 10); // Convert partialMatch to a number
    if (isNaN(idValue)) {
      console.error("Invalid ID value. Please enter a valid number.");
      return null;
    }
    query = query.eq("id", idValue); // Exact match for numeric ID
  } else {
    // For other fields like "name", "company", etc., use `.ilike()` for partial string matching
    query = query.ilike(searchBy, `%${partialMatch}%`);
  }

  const {
    data,
    error,
  }: { data: Product[] | null; error: PostgrestError | null } = await query;

  if (error) {
    console.error("Error fetching items:", error);
    return null;
  }
  return data;
}
