import type { Metadata } from "next";
import { PackageOpen } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGrid } from "@/components/product/ProductGrid";
import { categories, getCategory, getProductsForListing } from "@/lib/data";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  const products = getProductsForListing(slug);

  return (
    <div className="page">
      <Breadcrumb items={[{ label: "Categories" }, { label: category.name }]} />

      <header className="listingHead">
        <h1 className="listingTitle listingTitle--upper">{category.name}</h1>
        <span className="listingAccent" />
        {category.description && (
          <p className="listingDesc">{category.description}</p>
        )}
        <p className="listingCount">
          {products.length} product{products.length === 1 ? "" : "s"}
        </p>
      </header>

      <div className="listingBody">
        {products.length ? (
          <ProductGrid products={products} />
        ) : (
          <EmptyState
            icon={PackageOpen}
            title="No products here yet"
            message="This collection is being stocked. Check back soon or explore our other collections."
          />
        )}
      </div>
    </div>
  );
}
