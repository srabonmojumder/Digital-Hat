"use client";

import Link from "next/link";
import { X } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { ProductImage } from "@/components/ui/ProductImage";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { useCart } from "@/lib/cart-context";
import { formatTaka } from "@/lib/format";

/** A single editable cart/order line — used by the cart and checkout pages. */
export function CartLine({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="cl">
      <Link href={`/product/${item.slug}`} className="clImgLink">
        <ProductImage
          seed={item.imageSeed}
          category={item.categorySlug}
          name={item.name}
          className="clImg"
        />
      </Link>

      <div className="clBody">
        <div className="clHead">
          <div>
            <Link href={`/product/${item.slug}`} className="clTitle">
              {item.name}
            </Link>
            <p className="clMeta">
              {item.sku}
              {item.size ? ` · Size: ${item.size}` : ""}
            </p>
          </div>
          <button onClick={() => removeItem(item.key)} className="clRemove">
            <X />
            Remove
          </button>
        </div>

        <div className="clFoot">
          <QuantityStepper
            value={item.quantity}
            onChange={(q) => updateQuantity(item.key, q)}
            size="sm"
          />
          <p className="clPrice">{formatTaka(item.price * item.quantity)}</p>
        </div>
      </div>
    </div>
  );
}
