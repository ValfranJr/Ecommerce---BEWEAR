import { getAdminSalesSummary } from "@/actions/get-admin-sales-summary";
import { useQuery } from "@tanstack/react-query";

export const getAdminSalesSummaryQueryKey = (params: {
  period: "day" | "week" | "month" | "year";
  from?: string;
  to?: string;
}) => ["admin-sales-summary", params.period, params.from, params.to] as const;

export const useAdminSalesSummary = (params: {
  period: "day" | "week" | "month" | "year";
  from?: string;
  to?: string;
  initialData?: Awaited<ReturnType<typeof getAdminSalesSummary>>;
}) => {
  return useQuery({
    queryKey: getAdminSalesSummaryQueryKey({
      period: params.period,
      from: params.from,
      to: params.to,
    }),
    queryFn: () =>
      getAdminSalesSummary({
        period: params.period,
        from: params.from,
        to: params.to,
      }),
    initialData: params.initialData,
  });
};
