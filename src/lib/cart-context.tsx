"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "./types";

const STORAGE_KEY = "digital-hat-cart";
const MAX_QTY = 99;

type AddInput = Omit<CartItem, "key" | "quantity">;

interface CartContextValue {
  items: CartItem[];
  /** Total number of units across all lines (for the header badge). */
  count: number;
  /** Sum of price × quantity. */
  subtotal: number;
  /** Whether the cart has loaded from localStorage (avoids SSR mismatch). */
  hydrated: boolean;
  addItem: (input: AddInput, quantity?: number) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/** Stable key so the same product+size collapses into one line. */
function lineKey(productId: string, size?: string) {
  return `${productId}::${size ?? ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time cart hydration from localStorage (SSR-safe)
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage may be unavailable */
    }
  }, [items, hydrated]);

  const addItem = useCallback((input: AddInput, quantity = 1) => {
    const key = lineKey(input.productId, input.size);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) =>
          i.key === key
            ? { ...i, quantity: Math.min(MAX_QTY, i.quantity + quantity) }
            : i,
        );
      }
      return [...prev, { ...input, key, quantity: Math.min(MAX_QTY, quantity) }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.key !== key)
        : prev.map((i) =>
            i.key === key
              ? { ...i, quantity: Math.min(MAX_QTY, quantity) }
              : i,
          ),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
    return { items, count, subtotal, hydrated, addItem, updateQuantity, removeItem, clear };
  }, [items, hydrated, addItem, updateQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
