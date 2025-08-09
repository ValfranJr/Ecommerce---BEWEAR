"use client";

import CartSummary from "@/app/cart/components/cart-summary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { orderTable } from "@/db/schema";

interface OrdersProps {
  orders: Array<{
    id: string;
    totalPriceInCents: number;
    status: (typeof orderTable.$inferSelect)["status"];
    createdAt: Date;
    items: Array<{
      imageUrl: string;
      productName: string;
      productVariantName: string;
      priceInCents: number;
      quantity: number;
    }>;
  }>;
}

const Orders = ({ orders }: OrdersProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card>
          <CardContent>
            <Accordion type="single" key={order.id} collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold">
                      {order.status === "paid" && <Badge>Pago</Badge>}
                      {order.status === "pending" && (
                        <Badge variant="secondary">Aguardando pagamento</Badge>
                      )}
                      {order.status === "canceled" && (
                        <Badge variant="destructive">Cancelado</Badge>
                      )}
                    </p>
                    <p>
                      Pedido feito em{" "}
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <CartSummary
                    subtotalInCents={order.totalPriceInCents}
                    totalInCents={order.totalPriceInCents}
                    products={order.items.map((item) => ({
                      id: item.productName,
                      name: item.productName,
                      variantName: item.productVariantName,
                      quantity: item.quantity,
                      imageUrl: item.imageUrl,
                      priceInCents: item.priceInCents,
                    }))}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
