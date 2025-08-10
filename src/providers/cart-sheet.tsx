"use client";

import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CartSheetContextValue = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
};

const CartSheetContext = createContext<CartSheetContextValue | null>(null);

export const CartSheetProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const value = useMemo<CartSheetContextValue>(
    () => ({
      isOpen,
      setOpen: setIsOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [isOpen],
  );
  return (
    <CartSheetContext.Provider value={value}>
      {children}
    </CartSheetContext.Provider>
  );
};

export const useCartSheet = () => {
  const ctx = useContext(CartSheetContext);
  if (!ctx)
    throw new Error("useCartSheet must be used within CartSheetProvider");
  return ctx;
};
