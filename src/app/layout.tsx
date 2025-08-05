import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
