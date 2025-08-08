import { createShippingAddress } from "@/actions/create-shipping-address";
import { useMutation } from "@tanstack/react-query";
import { CreateShippingAddressSchema } from "@/actions/create-shipping-address/schema";

export const getCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: (data: CreateShippingAddressSchema) =>
      createShippingAddress(data),
  });
};
