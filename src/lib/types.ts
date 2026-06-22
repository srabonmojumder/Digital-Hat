// Core domain types for the Digital Hat storefront.

export interface Product {
  id: string;
  slug: string;
  name: string;
  sku: string;
  brand: string;
  /** Current selling price in BDT (৳). */
  price: number;
  /** Original price if the product is on sale; undefined when not discounted. */
  oldPrice?: number;
  /** Primary category slug (matches a Category.slug). */
  categorySlug: string;
  /** Optional human-readable collection label, e.g. "Eid Collection". */
  collection?: string;
  /** Selectable sizes for apparel; omit for accessories. */
  sizes?: string[];
  /** Units in stock; 0 renders an OUT OF STOCK overlay. */
  stock: number;
  description: string;
  /** Seed used to vary the generated placeholder artwork. */
  imageSeed: number;
  /** Number of gallery images to render on the detail page. */
  galleryCount: number;
  /** Tags used to populate homepage sections, e.g. "new-arrivals". */
  tags: string[];
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
}

/** A leaf link in the navigation. */
export interface NavLeaf {
  label: string;
  href: string;
}

/** A first-level dropdown item that may open a second-level fly-out. */
export interface NavGroupItem extends NavLeaf {
  children?: NavLeaf[];
}

/** A top-level navigation entry. */
export interface NavItem {
  label: string;
  href: string;
  /** Highlight the label in brand red (e.g. RAMADAN OFFER). */
  accent?: boolean;
  /** Dropdown column items; presence makes this a mega-menu trigger. */
  items?: NavGroupItem[];
}

/** A single line in the cart, keyed by product + chosen size. */
export interface CartItem {
  key: string;
  productId: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  size?: string;
  quantity: number;
  imageSeed: number;
  categorySlug: string;
}

export type DeliveryArea = "inside-dhaka" | "outside-dhaka";
