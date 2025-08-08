import { getUserAddresses } from "@/actions/get-user-addresses";
import { shippingAddressTable } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";

export const getShippingAddressesQueryKey = () =>
  ["shipping-addresses"] as const;

export const useShippingAddresses = (params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getShippingAddressesQueryKey(),
    queryFn: () => getUserAddresses(),
    initialData: params?.initialData,
  });
};
