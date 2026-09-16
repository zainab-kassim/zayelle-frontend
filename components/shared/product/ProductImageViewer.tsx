"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageViewerProps {
  images: string[];
  name: string;
}

export default function ProductImageViewer({ images, name }: ProductImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Touch/swipe state (mobile) ─────────────────────────────────
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  if (!images || images.length === 0) return null;

  const goTo = (i: number) => setActiveIndex(Math.max(0, Math.min(images.length - 1, i)));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) goTo(activeIndex + 1);
      else goTo(activeIndex - 1);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full">
      {/* ── Main image ────────────────────────────────────────────── */}
      <div
        className="relative w-full bg-surface rounded-2xl overflow-hidden aspect-[5/4]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="absolute inset-12 sm:inset-14 lg:inset-16"
          >
            <Image
              src={images[activeIndex]}
              alt={`${name}, view ${activeIndex + 1}`}
              fill
              className="object-contain object-center"
              sizes="(max-width: 1024px) 90vw, 45vw"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Image counter */}
        {images.length > 1 && (
          <span className="absolute top-3 right-3 sm:top-4 sm:right-4 font-sans text-ink text-[11px] tracking-[0.05em] bg-paper/90 backdrop-blur-sm border border-line rounded-full px-3 py-1">
            {activeIndex + 1} / {images.length}
          </span>
        )}

        {/* Prev/next — desktop only, thumbnails cover this on touch devices */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous image"
              className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-paper/90 border border-line text-ink transition-all duration-200 hover:bg-ink hover:text-paper hover:border-ink disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === images.length - 1}
              aria-label="Next image"
              className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 items-center justify-center rounded-full bg-paper/90 border border-line text-ink transition-all duration-200 hover:bg-ink hover:text-paper hover:border-ink disabled:opacity-0 disabled:pointer-events-none"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnail rail ────────────────────────────────────────── */}
      {images.length > 1 && (
        <div className="flex flex-row gap-2.5 sm:gap-3">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => goTo(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={activeIndex === i}
              className={`group relative w-36 h-36 sm:w-40 sm:h-40 flex-shrink-0 bg-surface rounded-xl overflow-hidden border-[0.5px] transition-colors duration-200 ${
                activeIndex === i ? "border-muted" : "border-transparent hover:border-line"
              }`}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-contain object-center p-2"
                sizes="160px"
              />
              {/* Unselected veil — makes the active thumbnail read as "on" */}
              {activeIndex !== i && (
                <span className="absolute inset-0 bg-paper/55 transition-opacity duration-200 group-hover:bg-paper/25" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
