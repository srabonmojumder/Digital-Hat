import type { Category, NavItem, Product } from "./types";

/* ---------------------------------------------------------------------------
   Helpers
--------------------------------------------------------------------------- */

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleize(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const APPAREL_SIZES = ["M", "L", "XL", "XXL"];

const SKU_PREFIX: Record<string, string> = {
  panjabi: "PNJ",
  wallets: "WAL",
  "long-wallets": "LWA",
  "mini-wallets": "MWA",
  belts: "BLT",
  "key-ring": "KEY",
  "gift-combos": "CMB",
  "women-leather": "WMN",
  shirt: "SHT",
  "luxury-shirt": "LSH",
  "t-shirt": "TSH",
  "trousers-pajama": "TRS",
  jacket: "JKT",
  cap: "CAP",
  "gadget-hub": "GAD",
  perfume: "PRF",
};

const LEATHER_CATS = new Set([
  "wallets",
  "long-wallets",
  "mini-wallets",
  "belts",
  "key-ring",
  "gift-combos",
  "women-leather",
]);

/** Build a believable mixed Bangla + English description. */
function describe(name: string, cat: string): string {
  const intro = `Introducing the ${name} from Digital Hat — crafted with meticulous attention to detail for the modern Bangladeshi lifestyle. Premium materials, refined finishing and everyday durability come together in a piece you will reach for again and again.`;

  let bn: string;
  if (LEATHER_CATS.has(cat)) {
    bn = "১০০% খাঁটি লেদার দিয়ে নিখুঁতভাবে তৈরি। দীর্ঘস্থায়ী, মজবুত সেলাই এবং প্রিমিয়াম ফিনিশিং — প্রতিদিনের ব্যবহারের জন্য পারফেক্ট। প্রতিটি পণ্য হাতে তৈরি ও মান নিয়ন্ত্রিত।";
  } else if (cat === "perfume") {
    bn = "দীর্ঘস্থায়ী প্রিমিয়াম সুগন্ধ, যেকোনো অনুষ্ঠানের জন্য উপযুক্ত। অল্প পরিমাণে ব্যবহারেই সারাদিন সতেজ অনুভব করুন।";
  } else if (cat === "gadget-hub") {
    bn = "লেটেস্ট টেকনোলজি, দীর্ঘ ব্যাটারি লাইফ এবং চমৎকার পারফরম্যান্স। ১ বছরের রিপ্লেসমেন্ট ওয়ারেন্টি সহ।";
  } else {
    bn = "প্রিমিয়াম ফ্যাব্রিক দিয়ে তৈরি, আরামদায়ক ফিট ও আকর্ষণীয় ডিজাইন। ঈদ হোক বা যেকোনো উৎসব — আপনার লুকের জন্য পারফেক্ট চয়েস।";
  }

  const closing =
    "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি (COD) সুবিধা। অর্ডার করতে কল করুন, WhatsApp বা Messenger-এ মেসেজ দিন — আমরা দ্রুত আপনার অর্ডার কনফার্ম করব।";

  return [intro, bn, closing].join("\n\n");
}

/* ---------------------------------------------------------------------------
   Categories (display names for listing pages + breadcrumbs)
--------------------------------------------------------------------------- */

export const categories: Category[] = [
  { slug: "panjabi", name: "Panjabi", description: "প্রিমিয়াম পাঞ্জাবি কালেকশন — ঈদ ও উৎসবের জন্য।" },
  { slug: "eid-collection", name: "Eid Collection 2026", description: "এবারের ঈদের সেরা কালেকশন।" },
  { slug: "ramadan-offer", name: "Ramadan Offer", description: "রমজান উপলক্ষে বিশেষ ছাড়।" },
  { slug: "leather", name: "Leather Collection", description: "১০০% খাঁটি লেদার পণ্য।" },
  { slug: "wallets", name: "Wallets" },
  { slug: "long-wallets", name: "Long Wallets" },
  { slug: "mini-wallets", name: "Mini Wallets" },
  { slug: "belts", name: "Belts" },
  { slug: "key-ring", name: "Key Ring" },
  { slug: "gift-combos", name: "Gift Combos" },
  { slug: "women-leather", name: "Women — Leather Collection" },
  { slug: "clothing", name: "Clothing" },
  { slug: "shirt", name: "Shirt" },
  { slug: "luxury-shirt", name: "Luxury Shirt" },
  { slug: "t-shirt", name: "T-Shirt" },
  { slug: "trousers-pajama", name: "Trousers & Pajama" },
  { slug: "jacket", name: "Jacket" },
  { slug: "cap", name: "Cap" },
  { slug: "gadget-hub", name: "Gadget Hub" },
  { slug: "perfume", name: "Perfume" },
  { slug: "new-arrivals", name: "New Arrivals" },
  { slug: "latest", name: "Latest Products" },
];

export function getCategory(slug: string): Category {
  return categories.find((c) => c.slug === slug) ?? { slug, name: titleize(slug) };
}

/* ---------------------------------------------------------------------------
   Products
--------------------------------------------------------------------------- */

interface Seed {
  name: string;
  cat: string;
  price: number;
  old?: number;
  stock: number;
  sizes?: string[];
  brand?: string;
  collection?: string;
  tags?: string[];
  gallery?: number;
}

let idCounter = 0;

function build(seed: Seed): Product {
  idCounter += 1;
  const id = idCounter;
  const tags = new Set(seed.tags ?? []);
  if (seed.old && seed.old > seed.price) {
    tags.add("sale");
    tags.add("ramadan-offer");
  }
  const prefix = SKU_PREFIX[seed.cat] ?? "DH";
  return {
    id: String(id),
    slug: slugify(seed.name),
    name: seed.name,
    sku: `DH-${prefix}-${1000 + id}`,
    brand: seed.brand ?? "Digital Hat",
    price: seed.price,
    oldPrice: seed.old,
    categorySlug: seed.cat,
    collection: seed.collection,
    sizes: seed.sizes,
    stock: seed.stock,
    description: describe(seed.name, seed.cat),
    imageSeed: id,
    galleryCount: seed.gallery ?? 4,
    tags: Array.from(tags),
  };
}

const SEEDS: Seed[] = [
  // ---- Panjabi / Eid ----
  { name: "Luxury Katan Panjabi", cat: "panjabi", price: 4200, old: 5500, stock: 12, sizes: APPAREL_SIZES, collection: "Eid Collection 2026", tags: ["eid-collection", "new-arrivals", "featured"] },
  { name: "Imperial Panjabi", cat: "panjabi", price: 3800, old: 4800, stock: 8, sizes: APPAREL_SIZES, collection: "Eid Collection 2026", tags: ["eid-collection", "featured"] },
  { name: "Festive Crown Panjabi", cat: "panjabi", price: 3500, stock: 20, sizes: APPAREL_SIZES, collection: "Eid Collection 2026", tags: ["eid-collection", "new-arrivals"] },
  { name: "Aristocrat Edition Panjabi", cat: "panjabi", price: 4500, old: 5800, stock: 5, sizes: APPAREL_SIZES, collection: "Eid Collection 2026", tags: ["eid-collection", "featured", "latest"] },
  { name: "Royal Signature Panjabi", cat: "panjabi", price: 3900, stock: 0, sizes: APPAREL_SIZES, collection: "Eid Collection 2026", tags: ["eid-collection"] },
  { name: "Premium Cotton Panjabi", cat: "panjabi", price: 2400, old: 2900, stock: 30, sizes: APPAREL_SIZES, tags: ["new-arrivals", "latest"] },
  { name: "Classic White Panjabi", cat: "panjabi", price: 1850, stock: 40, sizes: APPAREL_SIZES, tags: ["latest"] },
  { name: "Embroidered Karchupi Panjabi", cat: "panjabi", price: 3200, old: 3900, stock: 15, sizes: APPAREL_SIZES, tags: ["new-arrivals"] },

  // ---- Wallets ----
  { name: "Classic Leather Wallet", cat: "wallets", price: 1200, old: 1600, stock: 50, tags: ["new-arrivals", "leather", "featured"] },
  { name: "Premium Bifold Wallet", cat: "wallets", price: 1500, stock: 35, tags: ["leather", "latest"] },
  { name: "Slim Card Wallet", cat: "wallets", price: 950, old: 1200, stock: 25, tags: ["leather", "new-arrivals"] },
  { name: "Executive Leather Wallet", cat: "wallets", price: 1800, stock: 18, tags: ["leather", "featured"] },
  { name: "RFID Safe Wallet", cat: "wallets", price: 1650, old: 2100, stock: 6, tags: ["leather", "latest"] },
  { name: "Vintage Brown Wallet", cat: "wallets", price: 1350, stock: 0, tags: ["leather"] },

  // ---- Long Wallets ----
  { name: "Long Zipper Wallet", cat: "long-wallets", price: 2200, old: 2800, stock: 22, tags: ["leather", "new-arrivals", "featured"] },
  { name: "Executive Long Wallet", cat: "long-wallets", price: 2500, stock: 14, tags: ["leather", "latest"] },
  { name: "Travel Long Wallet", cat: "long-wallets", price: 2400, old: 2900, stock: 9, tags: ["leather"] },
  { name: "Clutch Long Wallet", cat: "long-wallets", price: 2650, stock: 7, tags: ["leather", "featured"] },

  // ---- Mini Wallets ----
  { name: "Mini Card Holder", cat: "mini-wallets", price: 650, stock: 60, tags: ["leather", "new-arrivals"] },
  { name: "Compact Coin Wallet", cat: "mini-wallets", price: 750, old: 950, stock: 30, tags: ["leather"] },

  // ---- Belts ----
  { name: "Classic Leather Belt", cat: "belts", price: 1100, old: 1500, stock: 40, tags: ["leather", "new-arrivals", "featured"] },
  { name: "Formal Buckle Belt", cat: "belts", price: 1250, stock: 28, tags: ["leather", "latest"] },
  { name: "Reversible Leather Belt", cat: "belts", price: 1450, old: 1800, stock: 16, tags: ["leather", "featured"] },
  { name: "Casual Pin Belt", cat: "belts", price: 950, stock: 0, tags: ["leather"] },
  { name: "Premium Italian Belt", cat: "belts", price: 1750, old: 2200, stock: 5, tags: ["leather", "latest"] },

  // ---- Key Ring ----
  { name: "Leather Key Ring", cat: "key-ring", price: 350, stock: 80, tags: ["leather", "new-arrivals"] },
  { name: "Premium Keychain Combo", cat: "key-ring", price: 450, old: 600, stock: 40, tags: ["leather"] },

  // ---- Gift Combos ----
  { name: "Eid Combo Panjabi Set", cat: "gift-combos", price: 4800, old: 6000, stock: 18, tags: ["eid-collection", "combo", "featured"] },
  { name: "Wallet and Belt Combo", cat: "gift-combos", price: 2400, old: 3200, stock: 20, tags: ["leather", "combo", "featured", "new-arrivals"] },
  { name: "Premium Gift Box Set", cat: "gift-combos", price: 3200, old: 4000, stock: 12, tags: ["leather", "combo", "featured"] },

  // ---- Women Leather ----
  { name: "Women Leather Handbag", cat: "women-leather", price: 2800, old: 3500, stock: 18, tags: ["leather", "women", "new-arrivals", "featured"] },
  { name: "Women Leather Wallet", cat: "women-leather", price: 1400, stock: 24, tags: ["leather", "women", "latest"] },
  { name: "Women Sling Bag", cat: "women-leather", price: 2200, old: 2700, stock: 9, tags: ["leather", "women"] },

  // ---- Shirt ----
  { name: "Formal Cotton Shirt", cat: "shirt", price: 1650, old: 2100, stock: 30, sizes: APPAREL_SIZES, tags: ["clothing", "new-arrivals", "latest"] },
  { name: "Casual Check Shirt", cat: "shirt", price: 1450, stock: 25, sizes: APPAREL_SIZES, tags: ["clothing"] },
  { name: "Oxford Formal Shirt", cat: "shirt", price: 1850, old: 2300, stock: 7, sizes: APPAREL_SIZES, tags: ["clothing", "featured"] },

  // ---- Luxury Shirt (discount-heavy) ----
  { name: "Luxury Egyptian Cotton Shirt", cat: "luxury-shirt", price: 2000, old: 3000, stock: 20, sizes: APPAREL_SIZES, tags: ["clothing", "luxury", "featured", "new-arrivals"] },
  { name: "Signature Linen Shirt", cat: "luxury-shirt", price: 2200, old: 3200, stock: 15, sizes: APPAREL_SIZES, tags: ["clothing", "luxury", "latest"] },
  { name: "Premium Slim-Fit Shirt", cat: "luxury-shirt", price: 1900, old: 2800, stock: 6, sizes: APPAREL_SIZES, tags: ["clothing", "luxury", "featured"] },

  // ---- T-Shirt ----
  { name: "Premium Polo T-Shirt", cat: "t-shirt", price: 850, old: 1100, stock: 50, sizes: APPAREL_SIZES, tags: ["clothing", "new-arrivals"] },
  { name: "Round Neck Cotton Tee", cat: "t-shirt", price: 650, stock: 60, sizes: APPAREL_SIZES, tags: ["clothing", "latest"] },

  // ---- Trousers & Pajama ----
  { name: "Gabardine Trouser", cat: "trousers-pajama", price: 1500, old: 1900, stock: 22, sizes: APPAREL_SIZES, tags: ["clothing", "latest"] },
  { name: "Cotton Pajama", cat: "trousers-pajama", price: 950, stock: 35, sizes: APPAREL_SIZES, tags: ["clothing"] },

  // ---- Jacket ----
  { name: "Leather Biker Jacket", cat: "jacket", price: 4500, old: 5500, stock: 8, sizes: APPAREL_SIZES, tags: ["clothing", "leather", "featured", "new-arrivals"] },

  // ---- Cap ----
  { name: "Classic Baseball Cap", cat: "cap", price: 450, old: 650, stock: 70, tags: ["new-arrivals", "featured"] },
  { name: "Premium Snapback Cap", cat: "cap", price: 550, stock: 40, tags: ["latest"] },
  { name: "Summer Bucket Hat", cat: "cap", price: 500, old: 700, stock: 0, tags: [] },

  // ---- Gadget Hub ----
  { name: "Wireless Earbuds Pro", cat: "gadget-hub", price: 1800, old: 2500, stock: 30, tags: ["new-arrivals", "featured"] },
  { name: "Smart Fitness Band", cat: "gadget-hub", price: 1500, stock: 20, tags: ["latest"] },
  { name: "Fast Charging Power Bank", cat: "gadget-hub", price: 1200, old: 1600, stock: 25, tags: [] },

  // ---- Perfume ----
  { name: "Oud Royal Attar", cat: "perfume", price: 1500, old: 2000, stock: 40, tags: ["new-arrivals", "featured"] },
  { name: "Musk Al Haramain", cat: "perfume", price: 1200, stock: 25, tags: ["latest"] },
  { name: "Premium Body Spray", cat: "perfume", price: 650, old: 850, stock: 0, tags: [] },
];

export const products: Product[] = SEEDS.map(build);

/* ---------------------------------------------------------------------------
   Lookups
--------------------------------------------------------------------------- */

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProductsByTag(tag: string): Product[] {
  return products.filter((p) => p.tags.includes(tag));
}

/**
 * Resolve products for any listing slug: prefer a real category match,
 * otherwise fall back to a tag match (covers virtual groupings like
 * "leather", "clothing", "eid-collection", "ramadan-offer", "new-arrivals").
 */
export function getProductsForListing(slug: string): Product[] {
  const byCat = getProductsByCategory(slug);
  if (byCat.length) return byCat;
  return getProductsByTag(slug);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.name, p.brand, p.sku, p.categorySlug, p.collection ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export function getRelatedProducts(product: Product, count = 8): Product[] {
  const sameCat = products.filter(
    (p) => p.id !== product.id && p.categorySlug === product.categorySlug,
  );
  const sharedTag = products.filter(
    (p) =>
      p.id !== product.id &&
      p.categorySlug !== product.categorySlug &&
      p.tags.some((t) => product.tags.includes(t)),
  );
  return [...sameCat, ...sharedTag].slice(0, count);
}

/* ---------------------------------------------------------------------------
   Navigation (mega-menu with second-level fly-outs)
--------------------------------------------------------------------------- */

export const navItems: NavItem[] = [
  {
    label: "PANJABI",
    href: "/category/panjabi",
    items: [
      {
        label: "Eid Collection",
        href: "/category/eid-collection",
        children: [
          { label: "Luxury Katan Panjabi", href: "/product/luxury-katan-panjabi" },
          { label: "Imperial Panjabi", href: "/product/imperial-panjabi" },
          { label: "Festive Crown", href: "/product/festive-crown-panjabi" },
          { label: "Aristocrat Edition", href: "/product/aristocrat-edition-panjabi" },
          { label: "Royal Signature", href: "/product/royal-signature-panjabi" },
        ],
      },
      { label: "Premium Collection", href: "/category/panjabi" },
      { label: "Classic Collection", href: "/category/panjabi" },
      { label: "Combo Collection", href: "/category/gift-combos" },
    ],
  },
  { label: "EID COLLECTION 2026", href: "/category/eid-collection", accent: true },
  { label: "RAMADAN OFFER", href: "/category/ramadan-offer", accent: true },
  {
    label: "LEATHER",
    href: "/category/leather",
    items: [
      {
        label: "Wallets",
        href: "/category/wallets",
        children: [
          { label: "Classic Leather Wallet", href: "/product/classic-leather-wallet" },
          { label: "Premium Bifold Wallet", href: "/product/premium-bifold-wallet" },
          { label: "Slim Card Wallet", href: "/product/slim-card-wallet" },
          { label: "RFID Safe Wallet", href: "/product/rfid-safe-wallet" },
        ],
      },
      { label: "Long Wallets", href: "/category/long-wallets" },
      { label: "Mini Wallets", href: "/category/mini-wallets" },
      { label: "Belts", href: "/category/belts" },
      { label: "Key Ring", href: "/category/key-ring" },
      { label: "Gifts Combos", href: "/category/gift-combos" },
    ],
  },
  {
    label: "WOMEN",
    href: "/category/women-leather",
    items: [{ label: "Leather Collection", href: "/category/women-leather" }],
  },
  {
    label: "CLOTHING",
    href: "/category/clothing",
    items: [
      {
        label: "Shirt",
        href: "/category/shirt",
        children: [
          { label: "Formal Shirt", href: "/category/shirt" },
          { label: "Casual Shirt", href: "/category/shirt" },
          { label: "Luxury Shirt", href: "/category/luxury-shirt" },
        ],
      },
      {
        label: "T-shirt",
        href: "/category/t-shirt",
        children: [
          { label: "Polo T-Shirt", href: "/category/t-shirt" },
          { label: "Round Neck", href: "/category/t-shirt" },
        ],
      },
      {
        label: "Trousers & Pajama",
        href: "/category/trousers-pajama",
        children: [
          { label: "Gabardine", href: "/category/trousers-pajama" },
          { label: "Pajama", href: "/category/trousers-pajama" },
        ],
      },
      { label: "Jacket", href: "/category/jacket" },
    ],
  },
  { label: "CAP", href: "/category/cap" },
  { label: "GADGET HUB", href: "/category/gadget-hub" },
  { label: "PERFUME", href: "/category/perfume" },
  {
    label: "PAGES",
    href: "/about",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Exchange Policy", href: "/exchange-policy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Returns & Refunds Policy", href: "/returns-refunds" },
    ],
  },
];
