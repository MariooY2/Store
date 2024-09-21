"use client";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { favoriteAdder } from "@/Backend/actions/FavoriteToggler";
import { useClerk } from "@clerk/nextjs";

function FavoriteToggleButton({
  productId,
  fav = false,
  email,
}: {
  productId: number;
  fav?: boolean;
  email: string | undefined;
}) {
  const { openSignIn } = useClerk();
  async function Toggler() {
    console.log(email)
    if (!email) {
      
      openSignIn();
    }
    const value = await favoriteAdder(productId);
  }

  return (
    <Button
      onClick={Toggler}
      size="icon"
      variant="outline"
      className="p-2 cursor-pointer"
    >
      <FaHeart className={fav ? "text-red-600" : " "} />
    </Button>
  );
}
export default FavoriteToggleButton;
