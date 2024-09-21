"use client";
import { deleteFromCart } from "@/Backend/actions/AddToCart";

function Button({
  email,
  Item_id,
}: {
  email: string | undefined;
  Item_id: number;
}) {
  const handleDelete = async () => {
    await deleteFromCart({ email, Item_id });
   
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 ease-in-out shadow-md focus:outline-none focus:ring-2 focus:ring-red-500"
    >
      Delete
    </button>
  );
}

export default Button;
