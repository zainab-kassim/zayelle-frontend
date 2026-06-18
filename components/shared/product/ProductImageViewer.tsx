// components/product/ProductImageViewer.tsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageViewerProps {
  images: string[];
  name: string;
}

const LABELS = ["Front", "Back"];

export default function ProductImageViewer({ images, name }: ProductImageViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  // ── Touch/swipe state (mobile) ─────────────────────────────────
  const touchStartX = useRef<number>(0);
  const touchEndX   = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0 && activeIndex < images.length - 1) setActiveIndex(1);
      if (diff < 0 && activeIndex > 0) setActiveIndex(0);
    }
  };

  // ── Shared dot nav ────────────────────────────────────────────
  const DotNav = () => (
    <div
      className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-row items-center gap-2 px-4 py-2 rounded-full z-10"
      style={{ background: "#373737" }}
    >
      {images.map((_, i) => (
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          aria-label={`View ${LABELS[i]}`}
          className="w-3 h-3 rounded-full transition-all duration-300"
          style={{ background: activeIndex === i ? "#6C6C6C" : "#FFFFFF" }}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-0 w-full">

      {/* ── Desktop image container ──────────────────────────────── */}
      <div
        className="hidden md:flex relative px-8 py-10 max-w-2xl rounded-2xl md:h-[480px] xl:h-[590px] overflow-hidden items-center justify-center"
        style={{ background: "#EEEEEE"}}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
         className="relative flex-shrink-0 mx-auto md:h-[90%] w-full xl:h-full "

          >
            <Image
              src={images[activeIndex]}
              alt={`${name} — ${LABELS[activeIndex]} view`}
              fill
              className="object-contain object-center"
              style={{ objectFit: 'contain', }}
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dots inside image container */}
        <DotNav />
      </div>

      {/* ── Mobile swipeable container ───────────────────────────── */}
      <div
        className="md:hidden relative w-full overflow-hidden rounded-2xl"
        style={{ background: "#EEEEEE", aspectRatio: "3/3.6" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      > {/* Track — slides horizontally */}
        <motion.div
          className="flex h-full"
          style={{ width: `${images.length * 100}%` }}
          animate={{ x: `-${activeIndex * (100 / images.length)}%` }}
          transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <Image
                src={src}
                alt={`${name} — ${LABELS[i]} view`}
                fill
                className="object-contain object-center p-10"
                priority={i === 0}
              />
            </div>
          ))}
        </motion.div>

        {/* Dots inside mobile image container */}
        <DotNav />
      </div>

    </div>
  );
}