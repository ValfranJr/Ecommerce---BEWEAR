"use client";

import { Button } from "@/components/ui/button";
import AddToCartButton from "./add-to-cart-button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useAddCartProduct } from "@/hooks/mutations/use-add-product-to-cart";
import { useRouter } from "next/navigation";
import { useRequireAuth } from "@/hooks/use-require-auth";
import LoginPopup from "@/components/ui/login-popup";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { mutate: addToCart, isPending } = useAddCartProduct();
  const { requireAuth, showLoginPopup, setShowLoginPopup } = useRequireAuth();

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  return (
    <>
      <div className="px-5">
        <div className="space-y-4">
          <h3 className="font-medium">Quantidade</h3>
          <div className="flex w-[100px] items-center justify-between rounded-lg border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>
            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col space-y-4 px-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button
          className="rounded-full"
          size="lg"
          disabled={isPending}
          onClick={() =>
            requireAuth(() =>
              addToCart(
                { productVariantId, quantity },
                {
                  onSuccess: () => router.push("/cart/identification"),
                },
              ),
            )
          }
        >
          Comprar agora
        </Button>
        <LoginPopup open={showLoginPopup} onOpenChange={setShowLoginPopup} />
      </div>
    </>
  );
};

export default ProductActions;
