import type { Metadata } from "next";
import { SearchX } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { EmptyState } from "@/components/ui/EmptyState";
import { ProductGrid } from "@/components/product/ProductGrid";
import { searchProducts } from "@/lib/data";

export const metadata: Metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const results = query ? searchProducts(query) : [];

  return (
    <div className="page">
      <Breadcrumb items={[{ label: "Search" }]} />

      <header className="listingHead">
        <h1 className="listingTitle">
          {query ? (
            <>
              Search results for{" "}
              <span className="listingTitleQuery">&ldquo;{query}&rdquo;</span>
            </>
          ) : (
            "Search"
          )}
        </h1>
        {query && (
          <p className="listingCount">
            {results.length} product{results.length === 1 ? "" : "s"} found
          </p>
        )}
      </header>

      <div className="listingBody">
        {query && results.length ? (
          <ProductGrid products={results} />
        ) : (
          <EmptyState
            icon={SearchX}
            title={query ? "No matching products" : "Start your search"}
            message={
              query
                ? `We couldn't find anything for "${query}". Try a different keyword.`
                : "Type a product name, brand or SKU in the search bar above."
            }
          />
        )}
      </div>
    </div>
  );
}
