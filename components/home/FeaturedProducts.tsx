import FetchItems from "@/Backend/actions/FetchItems";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";
import { currentUser } from "@clerk/nextjs/server";
interface Product {
  id: number;
  name: string;
  company: string;
  description: string;
  featured: boolean;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  clerkId: string;
}

async function FeaturedProducts() {
  const products: Product[] | null = await FetchItems();
  
  if (!products || products.length === 0) {
    return <EmptyList />;
  }
  const user = await currentUser();
  const email: undefined | string = user?.primaryEmailAddress?.emailAddress;
  
  return (
    <section className="pt-24">
      <SectionTitle text="Featured Products" />
      <ProductsGrid products={products} email={email}/>
    </section>
  );
}

export default FeaturedProducts;
