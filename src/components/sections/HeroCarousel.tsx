"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "EID COLLECTION 2026",
    title: "ঈদের সেরা পাঞ্জাবি কালেকশন",
    sub: "Premium Panjabi crafted for the festive season. Limited stock.",
    cta: "Shop Eid Collection",
    href: "/category/eid-collection",
  },
  {
    eyebrow: "100% GENUINE LEATHER",
    title: "খাঁটি লেদারের ওয়ালেট ও বেল্ট",
    sub: "Handcrafted wallets, belts & combos — built to last a lifetime.",
    cta: "Explore Leather",
    href: "/category/leather",
  },
  {
    eyebrow: "RAMADAN OFFER",
    title: "রমজান উপলক্ষে বিশেষ ছাড়",
    sub: "Save up to 40% across selected collections. Cash on Delivery.",
    cta: "Grab The Offer",
    href: "/category/ramadan-offer",
  },
];

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="hero">
      <div className="heroViewport" ref={emblaRef}>
        <div className="heroTrack">
          {SLIDES.map((s, i) => (
            <div key={s.eyebrow} className="heroSlide">
              <div className={`heroPane heroPane--g${i}`}>
                <div className="heroContent">
                  <p className="heroEyebrow">{s.eyebrow}</p>
                  <h2 className="heroTitle">{s.title}</h2>
                  <p className="heroSub">{s.sub}</p>
                  <Link href={s.href} className="heroCta btn btn--primary btn--lg">
                    {s.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous slide"
        className="heroArrow heroArrow--prev"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next slide"
        className="heroArrow heroArrow--next"
      >
        <ChevronRight />
      </button>

      <div className="heroDots">
        {SLIDES.map((s, i) => (
          <button
            key={s.eyebrow}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`heroDot${selected === i ? " heroDot--active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}
