import { getFavoritedProducts } from "@/Backend/actions/FetchFavorites";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";

async function FavoritesPage() {
    const favorites = await getFavoritedProducts();
    console.log(favorites)
    if (favorites?.length === 0)
      return <SectionTitle text='You have no favorites yet.' />;
    return (
      <div>
        <SectionTitle text='Favorites' />
        <ProductsGrid products={favorites}/>
      </div>
    );
  }
  
  export default FavoritesPage;