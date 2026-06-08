"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Review {
  id: number;
  name: string;
  messageParts: (string | React.ReactNode)[];
  align: "left" | "right";
  delay: number;
}

// ─── Review data ──────────────────────────────────────────────────────────────
const REVIEWS: Review[] = [
    { id: 1, name: "Amara O.", messageParts: ["The red floreal dress is absolutely stunning got so many compliments", <Image alt='flower' key="icon-1" width={18} height={18} src="https://img.icons8.com/?size=100&id=9NcUOxwcW2FQ&format=png&color=000000" className="inline-block align-middle mx-0.5" />,"!"], align: "left", delay: 0 },
    { id: 2, name: "Temi B.", messageParts: ["Ordered the pink one and it fits like a dream. Zayelle never misses", <Image alt='star' key="icon-2" width={18} height={18} src="https://img.icons8.com/?size=100&id=vjbhDe9kblMm&format=png&color=000000" className="inline-block align-middle mx-0.5" />], align: "right", delay: 0.15 },
    // { id: 3, name: "Chisom R.", messageParts: ["The quality is unreal for this price. Wore it to my birthday dinner"], align: "left", delay: 0.3 },
     { id: 4, name: "Fatima K.", messageParts: ["I've bought 3 pieces now. The Luxe Weave is my forever favourite."], align: "left", delay: 0.45 },
    { id: 5, name: "Sola M.", messageParts: ["Fast shipping, gorgeous packaging, beautiful dress. 10/10", <Image alt='heart' key="icon-5" width={18} height={18} src="https://img.icons8.com/?size=100&id=yvDn7fz9cUZy&format=png&color=000000" className="inline-block align-middle mx-0.5" />], align: "right", delay: 0.6 },
    { id: 6, name: "Ngozi E.", messageParts: ["Wore the black dress to a gala and felt like royalty. Thank you Zayelle!"], align: "left", delay: 0.75 },
];

// ─── Variants ─────────────────────────────────────────────────────────────────
const bubbleVariants = {
    hidden: (align: "left" | "right") => ({
        opacity: 0, scale: 0.88,
        x: align === "left" ? -24 : 24,
        y: 16,
    }),
    visible: {
        opacity: 1, scale: 1, x: 0, y: 0,
        transition: { type: "spring" as const, stiffness: 260, damping: 22 },
    },
};

const floatVariants = {
    float: (i: number) => ({
        y: [0, i % 2 === 0 ? -5 : -4, 0],
        transition: { duration: 3.5 + (i % 3) * 0.5, repeat: Infinity, ease: "easeInOut" as const },
    }),
};

// ─── Bubble tail SVG ──────────────────────────────────────────────────────────
function BubbleTail({ align }: { align: "left" | "right" }) {
    return (
        <span
            className="absolute bottom-0 pointer-events-none"
            style={{
                [align === "left" ? "left" : "right"]: "-6px",
                width: 13, height: 14,
            }}
        >
            <svg width="13" height="18" viewBox="0 0 10 14" fill="none">
                {align === "left"
                    ? <path d="M10 0 Q10 14 0 14 Q4 10 4 0 Z" fill="rgba(59, 130, 246)" />
                    : <path d="M0 0 Q0 14 10 14 Q6 10 6 0 Z" fill="rgb(255 255 255 / 0.65)" />
                }
            </svg>
        </span>
    );
}

// ─── Single bubble ────────────────────────────────────────────────────────────
function ReviewBubble({ review }: { review: Review }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const isRight = review.align === "right";

    return (
        <div ref={ref} className={`flex w-full ${isRight ? "justify-end" : "justify-start"}`}>
            <motion.div
                custom={review.align}
                variants={bubbleVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                transition={{ delay: review.delay }}
                className={`max-w-[72%] sm:max-w-[58%] md:max-w-[46%]`}
            >
                <motion.div
                    custom={review.id}
                    variants={floatVariants}
                    animate="float"
                    className="relative"
                >
                    <div
                        className={`
              relative p-4 md:px-6 md:py-5 rounded-2xl
              shadow-[0_4px_20px_rgba(0,0,0,0.07)]
              backdrop-blur-md
              ${isRight
                                ? "bg-white/65 border border-white/80 rounded-br-sm"
                                : "bg-blue-500  rounded-bl-sm"
                            }
            `}
                        style={{
                            boxShadow: isRight
                                ? "0 4px 24px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.85)"
                                : "0 4px 24px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.85)",
                        }}
                    >
                        {/* Name inside bubble */}
                        <p
                            className={`text-[13px] lg:text-[16px] font-bold tracking-widest uppercase mb-1 ${isRight ? "text-black" : "text-white"}`}
                            style={{ fontFamily: "Expletus Sans, serif" }}
                        >
                            {review.name}
                        </p>
                        {/* Message */}
                        <p
                            className={`text-[13px] md:text-[14px] lg:text-[16px] font-normal tracking-wide ${isRight ? "text-black" : "text-white"}`}
                        >
                            {review.messageParts.map((part, i) => (
                                <span key={i}>{part}</span>
                            ))}
                        </p>
                        <BubbleTail align={review.align} />
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─── Heading ──────────────────────────────────────────────────────────────────
function SectionHeading() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center gap-2 mb-10 text-center"
        >
            <div className="flex items-center gap-3">
                <span className="block h-px w-8 bg-black/40" />
                <span
                    className="text-[9px] tracking-[0.35em] uppercase text-blck font-semibold"
                    style={{ fontFamily: "Cairo, sans-serif" }}
                >
                    Customer Love
                </span>
                <span className="block h-px w-8 bg-black/40" />
            </div>
            <h2
                className="text-[#2a1f14] font-bold uppercase tracking-wide"
                style={{ fontFamily: '"Expletus Sans", serif', fontSize: "clamp(20px, 4vw, 36px)" }}
            >
                What They're Saying
            </h2>
        </motion.div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ReviewMessagesSectionA() {
    return (
        <section className="relative max-w-full  mx-auto overflow-hidden pt-3 pb-16 md:pb-24 " aria-label="Customer reviews">
            {/* <div className="absolute inset-x-4 hidden md:flex md:mx-4 sm:inset-x-8 inset-y-8 -z-10 rounded-3xl shadow-lg" style={{
                backdropFilter: 'blur(24px)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                boxShadow: '-1px 3px 10px rgba(0, 0, 0, 0.12)',
            }} /> */}
            <div className="relative z-10 max-w-full  px-6 md:px-20 lg:px-20 xl:px-24">
                <SectionHeading />
                <div className="flex flex-col gap-10 ">
                    {REVIEWS.map(r => <ReviewBubble key={r.id} review={r} />)}
                </div>
            </div>
        </section>
    );
}