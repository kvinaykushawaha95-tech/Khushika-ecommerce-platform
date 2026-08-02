import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";
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
  <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      borderRadius: "16px",
      background: "#fff",
      color: "#111827",
      border: "1px solid #f3f4f6",
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    },
    success: {
      iconTheme: {
        primary: "#ec4899",
        secondary: "#fff",
      },
    },
    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#fff",
      },
    },
  }}
/>

</body>

    </html>
  );
}