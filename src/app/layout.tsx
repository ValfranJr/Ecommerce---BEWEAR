import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/providers/react-query";
import { CartSheetProvider } from "@/providers/cart-sheet";

export const metadata: Metadata = {
  title: "Be Wear",
  description: "E-commerce de roupas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <CartSheetProvider>{children}</CartSheetProvider>
        </ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
