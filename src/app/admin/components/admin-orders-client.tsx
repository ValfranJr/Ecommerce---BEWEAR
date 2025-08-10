"use client";

import { useAdminOrders } from "@/hooks/queries/use-admin-orders";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import CartSummary from "@/app/cart/components/cart-summary";

const AdminOrdersClient = ({
  initialData,
}: {
  initialData: Awaited<
    ReturnType<typeof import("@/actions/get-admin-orders").getAdminOrders>
  >;
}) => {
  const { data } = useAdminOrders({ initialData });
  return (
    <div className="space-y-4">
      {data?.map((order) => (
        <Accordion key={order.id} type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              <div className="flex flex-col gap-2 text-left">
                <div className="flex items-center gap-2">
                  {order.status === "paid" && <Badge>Pago</Badge>}
                  {order.status === "pending" && (
                    <Badge variant="secondary">Aguardando pagamento</Badge>
                  )}
                  {order.status === "canceled" && (
                    <Badge variant="destructive">Cancelado</Badge>
                  )}
                  <span className="text-muted-foreground text-sm">
                    {new Date(order.createdAt).toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="text-muted-foreground text-xs">
                  {order.user.name} • {order.user.email}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <CartSummary
                subtotalInCents={order.totalPriceInCents}
                totalInCents={order.totalPriceInCents}
                products={order.items.map((item) => ({
                  id: item.id,
                  name: item.product.name,
                  variantName: item.variant.name,
                  quantity: item.quantity,
                  imageUrl: item.variant.imageUrl,
                  priceInCents: item.priceInCents,
                }))}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default AdminOrdersClient;
