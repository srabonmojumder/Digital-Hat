"use client";

import { Toaster } from "sonner";
import { CartProvider } from "@/lib/cart-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster
        position="top-center"
        richColors
        toastOptions={{
          style: { fontFamily: "var(--font-poppins)" },
        }}
      />
    </CartProvider>
  );
}
