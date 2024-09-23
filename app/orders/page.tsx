import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import SectionTitle from "@/components/global/SectionTitle";
import { fetchUserOrders } from "@/Backend/actions/FetchUserOrders";
import { formatCurrency } from "@/utils/formatCurrency";
async function OrdersPage() {
  const orders = await fetchUserOrders();

  return (
    <>
      <SectionTitle text="Your Orders" />
      <div>
        <Table>
          <TableCaption>Total orders : {orders?.length}</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Products</TableHead>
              <TableHead>Order Total</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order) => {
              const { id, Products, Total, created_at } = order;

              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <ul>
                      {Products.map((product: any) => (
                        <li key={product.id}>
                          {product.name} - {formatCurrency(product.price)} x{" "}
                          {product.quantity}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell>{formatCurrency(Total)}</TableCell>

                  <TableCell>
                    {new Date(created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
export default OrdersPage;
