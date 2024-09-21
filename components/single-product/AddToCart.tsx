"use client";
import { addToCart } from "@/Backend/actions/AddToCart";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
function AddToCart({
  productId,
  email,
}: {
  productId: string;
  email: string | undefined;
}) {
  const handleAddToCart = () => {
    if (!email) {
      console.error("Email is required to add an item to the cart.");
      toast({
        title: "Please Login first",
      });
      return;
    }
    const formatDate = (date: Date): string => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long", // Full name of the weekday (e.g., Friday)
        year: "numeric", // Full numeric year (e.g., 2023)
        month: "long", // Full name of the month (e.g., February)
        day: "numeric", // Day of the month (e.g., 10)
        hour: "numeric", // Hour (e.g., 5 PM)
        minute: "numeric", // Minute (e.g., 57)
        hour12: true, // Display in 12-hour format with AM/PM
      };

      return new Intl.DateTimeFormat("en-US", options).format(date);
    };

    // Get the current date and format it
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);

    // Call addToCart function
    addToCart({
      Item_id: Number(productId),
      quantity: 1,
      email: email,
    });
    toast({
      title: "Item Added To Cart",
      description: `${formattedDate}`,
    });
  };
  const { toast } = useToast();
  return (
    <>
      <Button className="capitalize mt-8" size="lg" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </>
  );
}

export default AddToCart;
