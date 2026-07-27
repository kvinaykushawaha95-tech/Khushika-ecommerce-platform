import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";


export const metadata: Metadata = {
  title: "Khushika Beauty & Fashion",
  description: "Premium Beauty & Fashion Store",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>

  <AuthProvider>

    <CartProvider>

      <WishlistProvider>

        {children}

      </WishlistProvider>

    </CartProvider>

  </AuthProvider>

</body>

    </html>
  );
}