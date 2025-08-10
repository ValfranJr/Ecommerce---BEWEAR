import { getAdminOrders } from "@/actions/get-admin-orders";
import { useQuery } from "@tanstack/react-query";

export const getAdminOrdersQueryKey = (params?: {
  from?: string;
  to?: string;
}) => ["admin-orders", params?.from, params?.to] as const;

export const useAdminOrders = (params?: {
  from?: string;
  to?: string;
  initialData?: Awaited<ReturnType<typeof getAdminOrders>>;
}) => {
  return useQuery({
    queryKey: getAdminOrdersQueryKey({ from: params?.from, to: params?.to }),
    queryFn: () => getAdminOrders({ from: params?.from, to: params?.to }),
    initialData: params?.initialData,
  });
};
