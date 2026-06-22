import type { Product } from "@/lib/types";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductGrid } from "./ProductGrid";

/** Homepage category block: titled header + "See All" + a row of products. */
export function CategorySection({
  title,
  href,
  products,
  limit = 4,
}: {
  title: string;
  href?: string;
  products: Product[];
  limit?: number;
}) {
  const items = products.slice(0, limit);
  if (!items.length) return null;

  return (
    <section className="catSection">
      <SectionHeader title={title} href={href} />
      <ProductGrid products={items} />
    </section>
  );
}
