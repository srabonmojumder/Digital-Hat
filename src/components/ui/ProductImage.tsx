import type { ComponentType } from "react";
import {
  Gift,
  Headphones,
  KeyRound,
  Ribbon,
  Shirt,
  ShoppingBag,
  SprayCan,
  Wallet,
} from "lucide-react";

/**
 * Deterministic, network-free placeholder artwork for the prototype.
 * Gradient (8 variants) + a faint category icon. Sizing comes from the
 * caller's className (e.g. .pcMediaImg, .clImg, .galMainImg).
 */

const ICONS: Record<string, ComponentType<{ className?: string }>> = {
  panjabi: Shirt,
  "eid-collection": Shirt,
  shirt: Shirt,
  "luxury-shirt": Shirt,
  "t-shirt": Shirt,
  "trousers-pajama": Shirt,
  jacket: Shirt,
  wallets: Wallet,
  "long-wallets": Wallet,
  "mini-wallets": Wallet,
  "women-leather": ShoppingBag,
  belts: Ribbon,
  "key-ring": KeyRound,
  "gift-combos": Gift,
  cap: ShoppingBag,
  "gadget-hub": Headphones,
  perfume: SprayCan,
};

export function ProductImage({
  seed,
  category,
  name,
  variant = 0,
  className = "",
}: {
  seed: number;
  category: string;
  name: string;
  variant?: number;
  className?: string;
}) {
  const Icon = ICONS[category] ?? ShoppingBag;
  const gradient = (seed + variant) % 8;

  return (
    <div className={`pimg pimg--g${gradient} ${className}`.trim()}>
      <Icon className="pimgIcon" />
      <span className="pimgMark">Digital Hat</span>
      <span className="srOnly">{name}</span>
    </div>
  );
}
