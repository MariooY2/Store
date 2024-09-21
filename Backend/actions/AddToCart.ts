import supabase from "../supabase";

export const addToCart = async ({
  Item_id,
  quantity,
  email,
}: {
  Item_id: number;
  quantity: number;
  email: string | undefined;
}): Promise<void> => {
  try {
    const { data, error } = await supabase.from("Cart").insert([
      {
        Item_id: Item_id,
        quantity: quantity,
        email: email,
      },
    ]);
    if (!email) {
      console.error("User email is missing. Cannot add item to cart.");
      return;
    }
    if (error) {
      throw new Error(error.message);
    }

    console.log("Item successfully added to cart:", data);
  } catch (err) {
    console.error("Error adding item to cart:", err);
  }
};
