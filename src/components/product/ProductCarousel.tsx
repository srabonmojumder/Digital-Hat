"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

/** Horizontally scrollable product strip (related / more products). */
export function ProductCarousel({ products }: { products: Product[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const [canScroll, setCanScroll] = useState({ prev: false, next: false });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScroll({ prev: emblaApi.canScrollPrev(), next: emblaApi.canScrollNext() });
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial arrow-state sync to embla API after mount
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  if (!products.length) return null;

  return (
    <div className="pcar">
      <div className="pcarViewport" ref={emblaRef}>
        <div className="pcarTrack">
          {products.map((p) => (
            <div key={p.id} className="pcarSlide">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => emblaApi?.scrollPrev()}
        disabled={!canScroll.prev}
        aria-label="Previous"
        className="pcarArrow pcarArrow--prev"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => emblaApi?.scrollNext()}
        disabled={!canScroll.next}
        aria-label="Next"
        className="pcarArrow pcarArrow--next"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
