import BreadCrumbs from "@/components/single-product/BreadCrumbs";
import FetchItems from "@/Backend/actions/FetchItems";
import Image from "next/image";
import { formatCurrency } from "@/utils/formatCurrency";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import { getFeaturedByEmailAndProductId } from "@/Backend/actions/FavoriteToggler";
import { currentUser } from "@clerk/nextjs/server";
async function SingleProductPage({ params }: { params: { id: string } }) {
  const product = await FetchItems(params.id, "id");
  const user = await currentUser();


  const email = user?.primaryEmailAddress?.emailAddress;
  if (!product || product.length === 0) {
    console.log("No product found");
    return <div>Product not found</div>;
  }
  const fav = await getFeaturedByEmailAndProductId(Number(params.id));
  const { name, image, company, description, price } = product[0];
  const dollarsAmount = formatCurrency(price);
  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw"
            priority
            className="w-full rounded-md object-cover"
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold">{name}</h1>
            <FavoriteToggleButton productId={Number(params.id)} fav={fav} email={email}/>
          </div>
          <ProductRating productId={params.id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-3 text-md bg-muted inline-block p-2 rounded-md">
            {dollarsAmount}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={params.id} email={email}/>
        </div>
      </div>
    </section>
  );
}
export default SingleProductPage;
