"use client";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useCartSheet } from "@/providers/cart-sheet";
import { useRequireAuth } from "@/hooks/use-require-auth";
import LoginPopup from "@/components/ui/login-popup";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  productVariantId,
  quantity,
}: AddToCartButtonProps) => {
  const queryClient = useQueryClient();
  const { openCart } = useCartSheet();
  const { requireAuth, showLoginPopup, setShowLoginPopup } = useRequireAuth();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      openCart();
    },
  });

  const handleAddToCart = () => {
    requireAuth(() => mutate());
  };

  return (
    <>
      <Button
        className="rounded-full"
        variant="outline"
        size="lg"
        disabled={isPending}
        onClick={handleAddToCart}
      >
        {isPending && <Loader2 className="animate-spin" />}
        Adicionar à sacola
      </Button>
      <LoginPopup open={showLoginPopup} onOpenChange={setShowLoginPopup} />
    </>
  );
};

export default AddToCartButton;
