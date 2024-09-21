import { getFavoritedProducts } from "@/Backend/actions/FetchFavorites";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { currentUser } from "@clerk/nextjs/server";
async function FavoritesPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    console.error("User email not found");
    return [];
  }
  const favorites = await getFavoritedProducts();
  console.log(favorites);
  if (favorites?.length === 0)
    return <SectionTitle text="You have no favorites yet." />;
  return (
    <div>
      <SectionTitle text="Favorites" />
      <ProductsGrid products={favorites} email={email} />
    </div>
  );
}

export default FavoritesPage;
