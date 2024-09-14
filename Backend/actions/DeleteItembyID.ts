"use server"
import supabase from "../supabase";
import { revalidatePath } from "next/cache";
async function DeletebyID(productId: number): Promise<void> {
  try {
    const { data, error } = await supabase
      .from("Products") // Replace 'Products' with your actual table name
      .delete()
      .eq("id", productId); // Delete the row where the id matches the given productId

    if (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/products");

    console.log("Product deleted successfully:", data);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}

export default DeletebyID;
