"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "@/components/ui/ProductImage";

export function ProductGallery({
  seed,
  category,
  name,
  count,
}: {
  seed: number;
  category: string;
  name: string;
  count: number;
}) {
  const [active, setActive] = useState(0);
  const zoomRef = useRef<HTMLDivElement>(null);
  const thumbs = Array.from({ length: Math.max(1, count) }, (_, i) => i);

  // Move the zoom origin to the cursor (no re-render — set CSS vars on the node).
  function handleZoom(e: React.MouseEvent<HTMLDivElement>) {
    const el = zoomRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--zoom-x", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--zoom-y", `${((e.clientY - r.top) / r.height) * 100}%`);
  }

  return (
    <div>
      <div className="galMain" ref={zoomRef} onMouseMove={handleZoom}>
        <ProductImage
          seed={seed}
          category={category}
          name={name}
          variant={active}
          className="galMainImg"
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
        />
      </div>

      <div className="galControls">
        <button
          onClick={() => setActive((a) => Math.max(0, a - 1))}
          disabled={active === 0}
          aria-label="Previous image"
          className="galArrow"
        >
          <ChevronLeft />
        </button>

        <div className="galThumbs no-scrollbar">
          {thumbs.map((i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`galThumb${active === i ? " galThumb--active" : ""}`}
            >
              <ProductImage
                seed={seed}
                category={category}
                name={`${name} thumbnail ${i + 1}`}
                variant={i}
                className="galThumbImg"
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => setActive((a) => Math.min(thumbs.length - 1, a + 1))}
          disabled={active === thumbs.length - 1}
          aria-label="Next image"
          className="galArrow"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
