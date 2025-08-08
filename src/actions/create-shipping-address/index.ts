"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { shippingAddressTable } from "@/db/schema";
import {
  createShippingAddressSchema,
  CreateShippingAddressSchema,
} from "./schema";
import { revalidatePath } from "next/cache";

export const createShippingAddress = async (
  data: CreateShippingAddressSchema,
) => {
  const parsed = createShippingAddressSchema.parse(data);
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const [address] = await db
    .insert(shippingAddressTable)
    .values({
      userId: session.user.id,
      recipientName: parsed.fullName,
      street: parsed.address,
      number: parsed.number,
      complement: parsed.complement,
      city: parsed.city,
      state: parsed.state.toUpperCase(),
      neighborhood: parsed.neighborhood,
      zipCode: parsed.zipCode,
      country: "BR",
      phone: parsed.phone,
      email: parsed.email,
      cpfOrCnpj: parsed.cpf,
    })
    .returning();
  revalidatePath("/cart/identification");

  return address;
};
