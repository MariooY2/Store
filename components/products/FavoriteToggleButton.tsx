"use client";
import { FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { favoriteAdder } from "@/Backend/actions/FavoriteToggler";


function FavoriteToggleButton({
  productId,
  fav,
}: {
  productId: number;
  fav: boolean;
}) {
  async function Toggler() {
    await favoriteAdder(productId);
   
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
