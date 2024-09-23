import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { updateOrderStatus } from "@/Backend/actions/CreateOrder";
import { deleteCartItems } from "@/Backend/actions/GetCartItems";
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id") as string;

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const orderId = session.metadata?.orderId;
    if (session.status === "complete") {
      updateOrderStatus(Number(orderId));
      deleteCartItems();
    }
  } catch (err) {
    console.log(err);
    return Response.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
  redirect("/orders");
};
