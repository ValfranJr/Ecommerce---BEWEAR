"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { cartTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  updateCartShippingAddressSchema,
  UpdateCartShippingAddressSchema,
} from "./schema";

export const updateCartShippingAddress = async (
  data: UpdateCartShippingAddressSchema,
) => {
  const parsed = updateCartShippingAddressSchema.parse(data);
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    where: (cart, { eq }) => eq(cart.userId, session.user.id),
  });

  if (!cart) {
    const [newCart] = await db
      .insert(cartTable)
      .values({
        userId: session.user.id,
        shippingAddressId: parsed.shippingAddressId,
      })
      .returning();
    return newCart;
  }

  const [updated] = await db
    .update(cartTable)
    .set({ shippingAddressId: parsed.shippingAddressId })
    .where(eq(cartTable.id, cart.id))
    .returning();

  return updated;
};
