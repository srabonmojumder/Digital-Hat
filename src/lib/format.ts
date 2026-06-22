// Formatting + small pricing helpers shared across the storefront.

/** Bangladeshi Taka sign. */
export const TAKA = "৳";

/** Delivery charges (BDT) by area — single source of truth for cart/checkout. */
export const DELIVERY_CHARGE = {
  "inside-dhaka": 70,
  "outside-dhaka": 130,
} as const;

/**
 * Format a number as a Taka price, e.g. 1499 -> "৳1,499".
 * Uses en-IN grouping which matches the South-Asian thousands style.
 */
export function formatTaka(amount: number): string {
  return `${TAKA}${Math.round(amount).toLocaleString("en-IN")}`;
}

/** Whole-number discount percentage, e.g. (oldPrice 1500, price 1000) -> 33. */
export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}
