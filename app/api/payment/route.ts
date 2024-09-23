import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { type NextRequest } from "next/server";
import { getCartItems } from "@/Backend/actions/GetCartItems";
import { getOrderById } from "@/Backend/actions/GetOrder";
export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");

  // Parse the request body
  const { orderId } = await req.json();

  // Fetch the order using getOrderById function
  const order = await getOrderById(Number(orderId));
  if (!order) {
    return Response.json(null, {
      status: 404,
      statusText: "Order not found",
    });
  }

  // Fetch the cart items for the user
  const cartItems = await getCartItems();
  if (!cartItems || cartItems.length === 0) {
    return Response.json(null, {
      status: 404,
      statusText: "Cart not found",
    });
  }

  console.log(order);
  const line_items = order.Products.map((cartItem: any) => {
    return {
      quantity: cartItem.quantity, // Assuming quantity exists on cartItem
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.name, // Assuming cartItem contains product details
          images: [cartItem.image],
        },
        unit_amount: cartItem.price  * 100, // price in cents
      },
    };
  });

  try {
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      metadata: { orderId },
      line_items: line_items,
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return Response.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating Stripe session:", error);

    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
