import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { fetchPaidOrders } from "@/Backend/actions/FetchOrders";
import { formatCurrency } from "@/utils/formatCurrency";

async function SalesPage() {
  const orders = await fetchPaidOrders();

  return (
    <div>
      <Table>
        <TableCaption>Total orders: {orders?.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order) => {
            const { Products, Total, email, created_at } = order;

            return (
              <TableRow key={order.id}>
                <TableCell>{email}</TableCell>
                {/* Render products details properly */}
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
  );
}

export default SalesPage;
