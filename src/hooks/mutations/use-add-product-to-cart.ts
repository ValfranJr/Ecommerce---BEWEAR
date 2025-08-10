import { addProductToCart } from "@/actions/add-cart-product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserCartQueryKey } from "../queries/use-cart";

export const getAddCartProductMutationKey = () => ["add-cart-product"] as const;

export const useAddCartProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: getAddCartProductMutationKey(),
    mutationFn: (params: { productVariantId: string; quantity: number }) =>
      addProductToCart(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserCartQueryKey() });
    },
  });
};
