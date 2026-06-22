"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, MessageCircle, Phone, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/lib/types";
import { Price } from "@/components/ui/Price";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
} from "@/components/ui/BrandIcons";
import { useCart } from "@/lib/cart-context";
import { site } from "@/lib/site";

const LOW_STOCK_THRESHOLD = 6;

export function ProductDetail({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [size, setSize] = useState<string | undefined>(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the page URL once on mount for share links
    setShareUrl(window.location.href);
  }, []);

  const outOfStock = product.stock <= 0;
  const lowStock = product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD;
  const maxQty = outOfStock ? 1 : Math.min(product.stock, 99);

  function lineItem() {
    return {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      sku: product.sku,
      price: product.price,
      size,
      imageSeed: product.imageSeed,
      categorySlug: product.categorySlug,
    };
  }

  function addToCart() {
    addItem(lineItem(), qty);
    toast.success("Product added to cart successfully!");
  }

  function buyNow() {
    addItem(lineItem(), qty);
    router.push("/checkout");
  }

  function copyLink() {
    navigator.clipboard
      .writeText(shareUrl || "")
      .then(() => toast.success("Link copied to clipboard!"))
      .catch(() => toast.error("Couldn't copy the link."));
  }

  const orderText = encodeURIComponent(
    `Hi Digital Hat, I want to order: ${product.name} (${product.sku}).`,
  );
  const enc = encodeURIComponent(shareUrl);

  const shareLinks = [
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc}`,
      Icon: FacebookIcon,
    },
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?url=${enc}&text=${encodeURIComponent(product.name)}`,
      Icon: XIcon,
    },
    {
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc}`,
      Icon: LinkedinIcon,
    },
    {
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${product.name} ${shareUrl}`)}`,
      Icon: WhatsappIcon,
    },
  ];

  return (
    <div>
      <h1 className="pdTitle">{product.name}</h1>
      <p className="pdSku">SKU: {product.sku}</p>

      <div className="pdPrice">
        <Price price={product.price} oldPrice={product.oldPrice} size="xl" />
      </div>

      {product.sizes?.length ? (
        <div className="pdBlock">
          <p className="pdLabel">Size</p>
          <div className="pdSizes">
            {product.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`pdSize${size === s ? " pdSize--active" : ""}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="pdMeta">
        <p className="pdMetaRow">
          BRAND: <b>{product.brand}</b>
        </p>
        <p className="pdStatus">
          STATUS:
          {outOfStock ? (
            <span className="pdStatusValue pdStatusValue--out">OUT OF STOCK</span>
          ) : lowStock ? (
            <span className="pdStatusValue pdStatusValue--low">
              STOCK LOW ({product.stock} LEFT)
            </span>
          ) : (
            <span className="pdStatusValue pdStatusValue--in">IN STOCK</span>
          )}
        </p>
      </div>

      <div className="pdQty">
        <span className="pdLabel">Quantity</span>
        <QuantityStepper value={qty} onChange={setQty} min={1} max={maxQty} />
      </div>

      <div className="pdActions">
        <button
          onClick={addToCart}
          disabled={outOfStock}
          className="btn btn--action btn--lg btn--block"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
        <button
          onClick={buyNow}
          disabled={outOfStock}
          className="btn btn--primary btn--lg btn--block"
        >
          Buy Now
        </button>

        <div className="pdChannels">
          <a href={`tel:${site.hotlineTel}`} className="btn btn--success">
            <Phone size={16} />
            Call Now
          </a>
          <a
            href={`https://wa.me/${site.whatsapp}?text=${orderText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--whatsapp"
          >
            <WhatsappIcon />
            WhatsApp
          </a>
          <a
            href={`https://m.me/${site.messenger}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--action"
          >
            <MessageCircle size={16} />
            Messenger
          </a>
        </div>
      </div>

      <div className="pdShare">
        <span className="pdShareLabel">Share:</span>
        {shareLinks.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="pdShareBtn"
          >
            <Icon />
          </a>
        ))}
        <button onClick={copyLink} aria-label="Copy link" className="pdShareBtn">
          <Link2 size={16} />
        </button>
      </div>
    </div>
  );
}
