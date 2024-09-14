"use server";
import { revalidatePath } from "next/cache";
import supabase from "../supabase";
interface Product {
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
}

async function addItem(product: Product) {
  try {
    //console.log(product)
    const { data, error } = await supabase.from("Products").insert([
      {
        name: product.name,
        company: product.company,
        description: product.description,
        featured: product.featured,
        image: product.image,
        price: product.price,
        createdAt: new Date().toISOString(), // Automatically adding createdAt
        updatedAt: new Date().toISOString(), // Automatically adding updatedAt
      },
    ]);

    if (error) {
      throw error;
    }
    revalidatePath("/admin/products");
    revalidatePath("/");
    revalidatePath("/products");
    console.log("Product added successfully:", data);
    return data; // Return the inserted product data if needed
  } catch (error) {
    console.error("Error adding product:", (error as Error).message);
    return null;
  }
}

export default addItem;
