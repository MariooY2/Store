"use client";
import { useState } from "react";
import CreateOrder from "@/Backend/actions/CreateOrder";
import { useRouter } from "next/navigation"; // Use the updated router hook
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string |undefined;
}

interface CheckOutProps {
  email: string;
  products: Product[];
  total: number;
}

function CheckOut({ email, products, total }: CheckOutProps) {
  console.log(products);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false); // Assuming you want to handle the paid status
  const router = useRouter();
  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const order = await CreateOrder({ email, products, total, isPaid });
      alert("Order placed successfully!");
      router.push(`/checkout?orderId=${order.id}`);
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Error placing order, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        className="bg-blue-600 text-white py-2 px-4 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}

export default CheckOut;
