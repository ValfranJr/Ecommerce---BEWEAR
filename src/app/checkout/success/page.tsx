"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/common/header";

const checkoutSuccessPage = () => {
  return (
    <>
      <Header />
      <Dialog open={true} onOpenChange={() => {}}>
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

export default checkoutSuccessPage;
