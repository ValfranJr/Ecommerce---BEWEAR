"use client";

import { createCheckoutSession } from "@/actions/create-checkout-session";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const FinishOrderButton = () => {
  const [sucessDialogisOpen, setSuccessDialogisOpen] = useState(false);
  const finishOrder = useFinishOrder();
  const handleFinishOrder = async () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Stripe publishable key not found");
    }
    const { orderId } = await finishOrder.mutateAsync();
    const checkoutSession = await createCheckoutSession({ orderId });
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
    );
    if (!stripe) {
      throw new Error("Stripe not found");
    }
    await stripe.redirectToCheckout({ sessionId: checkoutSession.id });
    setSuccessDialogisOpen(true);
  };

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={handleFinishOrder}
        disabled={finishOrder.isPending}
      >
        {finishOrder.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
        Finalizar compra
      </Button>
      <Dialog open={sucessDialogisOpen} onOpenChange={setSuccessDialogisOpen}>
        <DialogContent className="text-center">
          <Image
            src="/illustration.svg"
            alt="Success"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">
            Compra finalizada com sucesso!
          </DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi finalizado com sucesso. Voçê pode acompanhar o status
            na aba "Meus pedidos".
          </DialogDescription>
          <DialogFooter>
            <Button
              size="lg"
              className="w-full rounded-full"
              variant="outline"
              asChild
            >
              <Link href="/">Voltar para a loja</Link>
            </Button>
            <Button size="lg" className="w-full rounded-full">
              Ver meus pedidos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FinishOrderButton;
