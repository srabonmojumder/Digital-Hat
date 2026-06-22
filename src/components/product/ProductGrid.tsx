import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

/** Responsive product grid — 2 cols (mobile) up to 4 cols (desktop). */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="productGrid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
