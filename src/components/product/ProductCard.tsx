"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { Price } from "@/components/ui/Price";
import { useCart } from "@/lib/cart-context";
import { discountPercent } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const outOfStock = product.stock <= 0;
  const discount = discountPercent(product.price, product.oldPrice);
  const href = `/product/${product.slug}`;

  function lineItem() {
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      sku: product.sku,
      price: product.price,
      size: product.sizes?.[0],
      imageSeed: product.imageSeed,
      categorySlug: product.categorySlug,
    };
  }

  function addToCart() {
    addItem(lineItem());
    toast.success("Product added to cart successfully!");
  }

  function buyNow() {
    addItem(lineItem());
    router.push("/checkout");
  }

  return (
    <div className="pcCard">
      <Link href={href} className="pcMedia">
        <ProductImage
          seed={product.imageSeed}
          category={product.categorySlug}
          name={product.name}
          className="pcMediaImg"
        />
        {discount && !outOfStock && (
          <span className="pcBadge">{discount}% Off</span>
        )}
        {outOfStock && (
          <div className="pcOverlay">
            <span className="pcOverlayLabel">Out of Stock</span>
          </div>
        )}
      </Link>

      <div className="pcBody">
        <Link href={href} className="pcTitle">
          {product.name}
        </Link>
        <p className="pcSku">{product.sku}</p>
        <Price price={product.price} oldPrice={product.oldPrice} className="pcPrice" />

        <div className="pcActions">
          <button
            onClick={addToCart}
            disabled={outOfStock}
            className="btn btn--action btn--sm btn--grow"
          >
            <ShoppingCart size={14} />
            Add To Cart
          </button>
          <button
            onClick={buyNow}
            disabled={outOfStock}
            className="btn btn--primary btn--sm btn--grow"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
