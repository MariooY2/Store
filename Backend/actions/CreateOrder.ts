"use server";
import supabase from "../supabase";
import { revalidatePath } from "next/cache";
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image:string |undefined;
}

interface CreateOrderParams {
  email: string;
  products: Product[];
  total: number;
  isPaid: boolean;
}
export default async function CreateOrder({
  email,
  products,
  total,
}: CreateOrderParams): Promise<any> {
  try {
    const { data, error } = await supabase
      .from("Orders")
      .insert([
        {
          email,
          Products: products,
          Total: total,
          isPaid: false,
        },
      ])
      .select();

    if (error) {
      throw new Error(`Error creating order: ${error.message}`);
    }
    revalidatePath("/admin/sales")
    revalidatePath("/orders")
    console.log("Order created successfully:", data[0].id);
    return data[0];
  } catch (err) {
    console.error("Error creating order:", err);
  }
}

export async function updateOrderStatus(orderId: number): Promise<void> {
  try {
    const { data, error } = await supabase
      .from("Orders")
      .update({ isPaid: true })
      .eq("id", orderId); // Update the order with the specific orderId

    if (error) {
      throw new Error(`Error updating order status: ${error.message}`);
    }

    console.log(`Order ${orderId} updated successfully to isPaid`);
  } catch (err) {
    console.error("Error updating order status:", err);
  }
}
