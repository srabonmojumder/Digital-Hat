import { BadgeCheck, RefreshCw, Truck, Wallet } from "lucide-react";
import { HeroCarousel } from "@/components/sections/HeroCarousel";
import { CategorySection } from "@/components/product/CategorySection";
import { getProductsByCategory, getProductsByTag } from "@/lib/data";

const FEATURES = [
  { icon: Wallet, title: "Cash on Delivery", sub: "সারা দেশে COD সুবিধা" },
  { icon: Truck, title: "Fast Delivery", sub: "ঢাকায় ২৪–৪৮ ঘণ্টায়" },
  { icon: BadgeCheck, title: "100% Genuine Leather", sub: "খাঁটি লেদার গ্যারান্টি" },
  { icon: RefreshCw, title: "Easy Exchange", sub: "৭ দিনের এক্সচেঞ্জ" },
];

export default function Home() {
  return (
    <div className="home">
      <div className="homeHero">
        <HeroCarousel />
      </div>

      <div className="homeFeatures">
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="homeFeature">
              <span className="homeFeatureIcon">
                <Icon />
              </span>
              <div className="homeFeatureBody">
                <p className="homeFeatureTitle">{f.title}</p>
                <p className="homeFeatureSub">{f.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      <CategorySection
        title="New Arrivals"
        href="/category/new-arrivals"
        products={getProductsByTag("new-arrivals")}
      />
      <CategorySection
        title="Eid / Panjabi Collection"
        href="/category/panjabi"
        products={getProductsByCategory("panjabi")}
      />
      <CategorySection
        title="Latest Products"
        href="/category/latest"
        products={getProductsByTag("latest")}
      />
      <CategorySection
        title="Wallets"
        href="/category/wallets"
        products={getProductsByCategory("wallets")}
      />
      <CategorySection
        title="Long Wallets"
        href="/category/long-wallets"
        products={getProductsByCategory("long-wallets")}
      />
      <CategorySection
        title="Luxury Shirt"
        href="/category/luxury-shirt"
        products={getProductsByCategory("luxury-shirt")}
      />
      <CategorySection
        title="Belts"
        href="/category/belts"
        products={getProductsByCategory("belts")}
      />
      <CategorySection
        title="Cap"
        href="/category/cap"
        products={getProductsByCategory("cap")}
      />

      <div className="homeTail" />
    </div>
  );
}
