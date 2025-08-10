import { z } from "zod";

export const getSalesSummarySchema = z.object({
  period: z.enum(["day", "week", "month", "year"]).default("day"),
  from: z.string().optional(),
  to: z.string().optional(),
});

export type GetSalesSummarySchema = z.infer<typeof getSalesSummarySchema>;
