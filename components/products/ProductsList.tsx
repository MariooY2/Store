import { formatCurrency } from "@/utils/formatCurrency";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { getFeaturedByEmailAndProductId } from "@/Backend/actions/FavoriteToggler";
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

import FavoriteToggleButton from "./FavoriteToggleButton";
async function ProductsList({
  products,
  email,
}: {
  products: Product[];
  email?: string | undefined;
}) {
  return (
    <div className="mt-12 grid gap-y-8">
      {products.map(async (product) => {
        const { name, price, image, company } = product;
        const dollarsAmount = formatCurrency(price);
        const productId = product.id;
        const fav = await getFeaturedByEmailAndProductId(productId);
        return (
          <article key={productId} className="group relative">
            <Link href={`/products/${productId}`}>
              <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                  <div className="relative h-64  md:h-48 md:w-48">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
                      priority
                      className="w-full rounded-md object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold capitalize">{name}</h2>
                    <h4 className="text-muted-foreground">{company}</h4>
                  </div>
                  <p className="text-muted-foreground text-lg md:ml-auto">
                    {dollarsAmount}
                  </p>
                </CardContent>
              </Card>
            </Link>
            <div className="absolute bottom-8 right-8 z-5">
              <FavoriteToggleButton
                productId={productId}
                fav={fav}
                email={email}
              />
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default ProductsList;
