import ProductsGrid from "./ProductsGrid";
import ProductsList from "./ProductsList";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FetchItems from "@/Backend/actions/FetchItems";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
async function ProductsContainer({
  layout,
  search,
}: {
  layout: string;
  search: string;
}) {
  const user = await currentUser();
  const email: undefined | string = user?.primaryEmailAddress?.emailAddress;
  const products = await FetchItems(search);
  let totalProducts: number;
  if (!products) {
    totalProducts = 0;
  } else {
    totalProducts = products.length;
  }

  const searchTerm = search ? `&search=${search}` : "";
  return (
    <>
      {/* HEADER */}
      <section>
        <div className="flex justify-between items-center">
          <h4 className="font-medium text-lg">
            {totalProducts} product{totalProducts > 1 && "s"}
          </h4>
          <div className="flex gap-x-4">
            <Button
              variant={layout === "grid" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=grid${searchTerm}`}>
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === "list" ? "default" : "ghost"}
              size="icon"
              asChild
            >
              <Link href={`/products?layout=list${searchTerm}`}>
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className="mt-4" />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <h5 className="text-2xl mt-16">
            Sorry, no products matched your search...
          </h5>
        ) : layout === "grid" ? (
          <ProductsGrid products={products || []} email={email} />
        ) : (
          <ProductsList products={products || []} email={email} />
        )}
      </div>
    </>
  );
}
export default ProductsContainer;
