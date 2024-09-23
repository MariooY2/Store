import SectionTitle from "@/components/global/SectionTitle";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { formatCurrency } from "@/utils/formatCurrency";
import { getCartItems } from "@/Backend/actions/GetCartItems";
import FetchItems from "@/Backend/actions/FetchItems";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import { getFeaturedByEmailAndProductId } from "@/Backend/actions/FavoriteToggler";
import CheckOut from "./CheckOut";
import Button from "./Button";

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

async function CartPage() {
  const { userId } = auth();
  if (!userId) redirect("/");

  // Fetch the cart items
  const cartItems = await getCartItems();

  if (!cartItems || cartItems.length === 0) {
    return <SectionTitle text="Empty cart" />;
  }

  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  if (!email) {
    console.error("User email not found");
    return [];
  }

  const cartItemsWithDetails = await Promise.all(
    cartItems.map(async (cartItem) => {
      // Fetch the product details based on the Item_id in the cart
      const productDetails = await FetchItems(
        cartItem.Item_id.toString(),
        "id"
      );

      return {
        ...cartItem,
        product: productDetails ? productDetails[0] : null, // Assume it's an array and take the first item
      };
    })
  );

  // Calculate total price
  const totalPrice = cartItemsWithDetails.reduce(
    (total, item) =>
      total + (item.product ? item.product.price * item.quantity : 0),
    0
  );

  const products = cartItemsWithDetails;
  
  return (
    <>
      <SectionTitle text="Shopping Cart" />
      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          {products.map(async (item) => {
            const { product, quantity } = item;
            if (!product) return null;
            const { name, price, image, company } = product;
            const dollarsAmount = formatCurrency(price);
            const productId = product.id;
            const fav = await getFeaturedByEmailAndProductId(productId);

            return (
              <article key={productId} className="group relative">
                <Link href={`/products/${productId}`}>
                  <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
                    <CardContent className="p-8 gap-y-4 grid md:grid-cols-3">
                      <div className="relative h-64 md:h-48 md:w-48">
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
                        <h2 className="text-xl font-semibold capitalize">
                          {name}
                        </h2>
                        <p className="text-muted-foreground text-lg md:ml-auto">
                          Quantity: {quantity} {/* Display the quantity */}
                        </p>
                        <h4 className="text-muted-foreground">{company}</h4>
                      </div>
                      <p className="text-muted-foreground text-lg md:ml-auto">
                        {dollarsAmount}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
                <div className="absolute bottom-8 right-8 z-5 flex flex-col items-center gap-4 justify-center">
                  <FavoriteToggleButton
                    productId={productId}
                    fav={fav}
                    email={email}
                  />
                  <Button email={email} Item_id={productId} />
                </div>
              </article>
            );
          })}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-4 lg:pl-4 flex justify-center items-center">
          <div className="w-full max-w-md flex-col items-center justify-center p-4 border rounded-lg shadow-md mx-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>
                {formatCurrency(500)} {/* Placeholder shipping fee */}
              </span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{formatCurrency(totalPrice )}</span>
            </div>
            <div className="flex justify-center items-center p-5">
              <CheckOut
                email={email}
                products={products
                  .filter((item) => item.product !== null)
                  .map((item) => ({
                    id: item.product!.id,
                    name: item.product!.name,
                    price: item.product!.price,
                    quantity: item.quantity,
                    image:item?.product?.image
                  }))}
                total={totalPrice + 500}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
