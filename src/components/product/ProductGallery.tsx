"use client";

import { useState } from "react";
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
  const thumbs = Array.from({ length: Math.max(1, count) }, (_, i) => i);

  return (
    <div>
      <div className="galMain">
        <ProductImage
          seed={seed}
          category={category}
          name={name}
          variant={active}
          className="galMainImg"
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
