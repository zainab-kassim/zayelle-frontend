"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
type Position = "center" | "left" | "right" | "back";

interface DressItem {
  src: string;
  alt: string;
  name: string;
}

interface CarouselDressProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

// ─── Dress data ───────────────────────────────────────────────────────────────
const DRESSES: DressItem[] = [
  { src: "/dresses/dress-red.png",   alt: "Rouge Florale",   name: "Rouge Florale"   },
  { src: "/dresses/dress-black.png", alt: "Noir Classique",  name: "Noir Classique"  },
  { src: "/dresses/dress-pink.png",  alt: "Rose Fuchsia",    name: "Rose Fuchsia"    },
];

// ─── Constants ────────────────────────────────────────────────────────────────
const DURATION = 0.55;
const EASE     = [0.4, 0, 0.2, 1] as [number, number, number, number];
const INTERVAL = 1200; // ms between each rotation step

// ─── Motion variants ──────────────────────────────────────────────────────────
const VARIANTS: Record<Position, any> = {
  center: {
    x: "-50%", y: "0%",
    scale: 1.05, opacity: 1,
    filter: "blur(0px) brightness(1)",
    zIndex: 40,
  },
  left: {
    x: "-105%", y: "5%",
    scale: 0.86, opacity: 0.60,
    filter: "blur(2px) brightness(0.8)",
    zIndex: 10,
  },
  right: {
    x: "5%", y: "5%",
    scale: 0.86, opacity: 0.60,
    filter: "blur(2px) brightness(0.8)",
    zIndex: 20,
  },
  back: {
    x: "-50%", 
    y: "10%",
    scale: 0.5, opacity: 0.55,
  }
};

const NORMAL_TRANSITION = { duration: DURATION, ease: EASE };
// Wrapping dress (left → right) snaps instantly so it's never seen crossing.
const WRAP_TRANSITION   = { duration: 0 };

// ─── Shadow config ────────────────────────────────────────────────────────────
const SHADOW: Record<Position, { width: string; opacity: number }> = {
  center: { width: "62%", opacity: 0.20 },
  left:   { width: "48%", opacity: 0.11 },
  right:  { width: "48%", opacity: 0.11 },
    back:   { width: "38%", opacity: 0.02 },
};

// ─── Initial state ────────────────────────────────────────────────────────────
const INIT: Position[] = ["center", "right", "left","back"];

// ─── Component ────────────────────────────────────────────────────────────────
export default function CarouselDress({ setActiveIndex }: CarouselDressProps) {
  const posRef  = useRef<Position[]>(INIT);
  const [positions, setPositions] = useState<Position[]>(INIT);
  const [wrappingIdx, setWrappingIdx] = useState<number | null>(null);

  const rotate = () => {
    const prev = posRef.current;
    let wrapIdx = -1;

    const next: Position[] = prev.map((p, i) => {
      if (p === "center") return "left";
      if (p === "right")  return "center";
      // left → right: this dress wraps around — snap it invisibly
      wrapIdx = i;
      return "right";
    });

    posRef.current = next;
    setPositions(next);

    // Notify parent which dress is now at center
    const centerIdx = next.indexOf("center");
    if (centerIdx !== -1) setActiveIndex(centerIdx);


    if (wrapIdx !== -1) {
      setWrappingIdx(wrapIdx);
      setTimeout(() => setWrappingIdx(null), 60);
    }
  };

  // Continuous auto-rotation — no pause on hover, no manual trigger
  useEffect(() => {
    const id = setInterval(rotate, INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full h-[200px] md:h-[300px] lg:h-[360px]"
      aria-label="Floreal Collection dress carousel"
    >
      {DRESSES.map((dress, i) => {
        const pos        = positions[i];
        const shadow     = SHADOW[pos];
        const isWrapping = i === wrappingIdx;

        return (
          <motion.div
            key={dress.src}
            className="absolute bottom-0 left-1/2 select-none"
            animate={{
              ...VARIANTS[pos],
              opacity: isWrapping ? 0 : VARIANTS[pos].opacity,
            }}
            transition={isWrapping ? WRAP_TRANSITION : NORMAL_TRANSITION}
            initial={false}
            aria-label={dress.name}
          >
            {/* ── Dress image ────────────────────────────────────────── */}
            <div
              style={{
                width:    "clamp(140px, 22vw, 280px)",
                height:   "clamp(200px, 32vw, 400px)",
                position: "relative",
                flexShrink: 0,
              }}
            >
              <Image
                src={dress.src}
                alt={dress.alt}
                fill
                sizes="(max-width: 640px) 140px, (max-width: 1024px) 22vw, 280px"
                className="object-contain object-bottom"
                priority={i === 0}
                draggable={false}
              />

              {/*
               * ── Per-dress shadow ──────────────────────────────────
               */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2"
                style={{
                  transform: "translateX(-50%)",
                  height:       "14px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.45) 0%, transparent 70%)",
                }}
                animate={{ width: shadow.width, opacity: shadow.opacity }}
                transition={NORMAL_TRANSITION}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}