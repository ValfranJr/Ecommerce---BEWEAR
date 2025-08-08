"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFinishOrder } from "@/hooks/mutations/use-finish-order";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const FinishOrderButton = () => {
  const [sucessDialogisOpen, setSuccessDialogisOpen] = useState(true);
  const { mutate: finishOrder, isPending } = useFinishOrder();

  return (
    <>
      <Button
        className="w-full rounded-full"
        size="lg"
        onClick={() => finishOrder()}
        disabled={isPending}
      >
        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
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
            <Button size="lg" className="w-full rounded-full" variant="outline">
              Voltar para a loja
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
