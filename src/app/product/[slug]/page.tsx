import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductCarousel } from "@/components/product/ProductCarousel";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data";

const BENGALI = /[ঀ-৿]/;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return { title: product.name, description: product.description.slice(0, 150) };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const paragraphs = product.description.split("\n\n");

  return (
    <div className="page">
      <Breadcrumb items={[{ label: "Products" }, { label: product.name }]} />

      <div className="pdLayout">
        <ProductGallery
          seed={product.imageSeed}
          category={product.categorySlug}
          name={product.name}
          count={product.galleryCount}
        />
        <ProductDetail product={product} />
      </div>

      <section className="pdDesc">
        <h2 className="pdSectionTitle">Product Description</h2>
        <div className="pdDescBody">
          {paragraphs.map((para, i) => (
            <p key={i} className={BENGALI.test(para) ? "font-bn" : undefined}>
              {para}
            </p>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="pdRelated">
          <h2 className="pdSectionTitle">Related Products</h2>
          <ProductCarousel products={related} />
        </section>
      )}
    </div>
  );
}
