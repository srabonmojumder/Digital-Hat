import Image from "next/image";

/**
 * Product photo. Dummy images live in /public/products/{category}-{1..3}.jpg.
 * A product picks one of its category's 3 images deterministically (by seed),
 * and the gallery varies them via `variant`. Sizing comes from the caller's
 * className (e.g. .pcMediaImg, .galMainImg, .clImg).
 */
export function ProductImage({
  seed,
  category,
  name,
  variant = 0,
  className = "",
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: {
  seed: number;
  category: string;
  name: string;
  variant?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const idx = ((seed + variant) % 3) + 1;
  const src = `/products/${category}-${idx}.jpg`;

  return (
    <div className={`pimg ${className}`.trim()}>
      <Image
        src={src}
        alt={name}
        fill
        sizes={sizes}
        className="pimgPhoto"
        priority={priority}
      />
    </div>
  );
}
