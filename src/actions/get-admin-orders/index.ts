"use server";

import { db } from "@/db";
import { orderTable, userTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, between, desc, eq } from "drizzle-orm";
import { headers } from "next/headers";

export const getAdminOrders = async (params?: {
  from?: string;
  to?: string;
}) => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const user = await db.query.userTable.findFirst({
    where: (t, { eq }) => eq(t.id, session.user!.id),
  });
  if (!user?.isAdmin) {
    throw new Error("Unauthorized");
  }

  const where = [] as any[];
  if (params?.from && params?.to) {
    where.push(
      between(orderTable.createdAt, new Date(params.from), new Date(params.to)),
    );
  }

  const orders = await db.query.orderTable.findMany({
    where: where.length ? and(...where) : undefined,
    with: {
      items: {
        with: {
          productVariant: {
            with: {
              product: true,
            },
          },
        },
      },
      user: true,
    },
    orderBy: desc(orderTable.createdAt),
  });

  return orders.map((order) => ({
    id: order.id,
    createdAt: order.createdAt,
    status: order.status,
    totalPriceInCents: order.totalPriceInCents,
    user: {
      id: order.user.id,
      name: order.user.name,
      email: order.user.email,
    },
    items: order.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      priceInCents: item.priceInCents,
      product: {
        id: item.productVariant.product.id,
        name: item.productVariant.product.name,
      },
      variant: {
        id: item.productVariant.id,
        name: item.productVariant.name,
        imageUrl: item.productVariant.imageUrl,
      },
    })),
  }));
};
