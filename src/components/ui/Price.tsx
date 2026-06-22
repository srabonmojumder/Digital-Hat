import { formatTaka } from "@/lib/format";

/**
 * Price display. On sale: current price in brand red + struck-through old
 * price. Otherwise: current price in near-black ink. Styled via SCSS (.price).
 */
export function Price({
  price,
  oldPrice,
  size = "md",
  className = "",
}: {
  price: number;
  oldPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const onSale = oldPrice !== undefined && oldPrice > price;
  return (
    <div className={`price price--${size} ${className}`.trim()}>
      <span className={onSale ? "priceNow priceNow--sale" : "priceNow"}>
        {formatTaka(price)}
      </span>
      {onSale && <span className="priceOld">{formatTaka(oldPrice)}</span>}
    </div>
  );
}
