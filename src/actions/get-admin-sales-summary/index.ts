"use server";

import { db } from "@/db";
import { orderTable, userTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, between, eq, gte, lte, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { getSalesSummarySchema, GetSalesSummarySchema } from "./schema";

export const getAdminSalesSummary = async (data: GetSalesSummarySchema) => {
  const parsed = getSalesSummarySchema.parse(data);
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

  const now = new Date();
  let fromDate: Date | undefined;
  let toDate: Date | undefined;

  if (parsed.from) fromDate = new Date(parsed.from);
  if (parsed.to) toDate = new Date(parsed.to);

  if (!fromDate || !toDate) {
    const start = new Date(now);
    const end = new Date(now);
    if (parsed.period === "day") {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    } else if (parsed.period === "week") {
      const day = start.getDay();
      const diff = (day + 6) % 7;
      start.setDate(start.getDate() - diff);
      start.setHours(0, 0, 0, 0);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
    } else if (parsed.period === "month") {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(start.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
    } else if (parsed.period === "year") {
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);
      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
    }
    fromDate = start;
    toDate = end;
  }

  const [row] = await db
    .select({
      totalSalesInCents: sql<number>`COALESCE(SUM(${orderTable.totalPriceInCents}), 0)`,
      totalOrders: sql<number>`COUNT(${orderTable.id})`,
    })
    .from(orderTable)
    .where(
      and(
        eq(orderTable.status, "paid"),
        between(orderTable.createdAt, fromDate!, toDate!),
      ),
    );

  return {
    period: parsed.period,
    from: fromDate!.toISOString(),
    to: toDate!.toISOString(),
    totalSalesInCents: Number(row?.totalSalesInCents ?? 0),
    totalOrders: Number(row?.totalOrders ?? 0),
  };
};
