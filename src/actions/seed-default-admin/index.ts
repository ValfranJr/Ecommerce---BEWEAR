"use server";

import { db } from "@/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export const seedDefaultAdmin = async () => {
  const email = process.env.DEFAULT_ADMIN_EMAIL ?? "admin@bewear.local";
  const password = process.env.DEFAULT_ADMIN_PASSWORD ?? "Admin@1234";

  const existing = await db.query.userTable.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });
  if (existing) {
    if (!existing.isAdmin) {
      await db
        .update(userTable)
        .set({ isAdmin: true })
        .where(eq(userTable.id, existing.id));
    }
    return { created: false, email };
  }

  const host = (await headers()).get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const res = await fetch(`${baseUrl}/api/auth/sign-up/email`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password, name: "Admin" }),
  });
  if (!res.ok) {
    throw new Error("Failed to create default admin");
  }
  const createdUser = await res.json();
  const newUser = await db.query.userTable.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });
  if (newUser && !newUser.isAdmin) {
    await db
      .update(userTable)
      .set({ isAdmin: true })
      .where(eq(userTable.id, newUser.id));
  }
  return { created: true, email };
};
