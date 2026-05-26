"use client";

import { useState } from "react";
import Link from "next/link";
import CarouselDress from "@/components/ui/CarouselDress";


export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section
            className="w-full flex flex-col items-center justify-start bg-white py-6 mt-20 sm:mt-24 "
            aria-label="Floreal Collection hero"
        >
            {/* ── Hero card ──────────────────────────────────────────────── */}
            <div
                className="relative w-full pb-12  rounded-3xl overflow-hidden flex flex-col items-center  card-bg bg-[url('https://images.unsplash.com/photo-1617957899402-d9b054d31591?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D')] bg-cover bg-center"
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 80% 45% at 50% -5%, rgba(255,235,210,0.55) 0%, transparent 60%)",
                    }}
                />

                {/* ── Header text block ─────────────────────────────────────── */}
                <div className="relative z-10 w-full flex flex-col items-center pt-7 sm:pt-14 px-6 text-center">

                    {/* NEW ARRIVALS row */}
                    <div className="flex items-center gap-3 mb-3 sm:mb-4">
                        <span
                            className="block h-px bg-[#1C1C1C] opacity-40"
                            style={{ width: "clamp(28px, 6vw, 60px)" }}
                        />
                        <span
                            className="text-[#1C1C1C] tracking-[0.28em] opacity-60 font-medium"
                            style={{
                                fontFamily: '"Expletus Sans", serif',
                                fontSize: "clamp(8px, 1.4vw, 11px)",
                                letterSpacing: "0.28em",
                                textTransform: "uppercase",
                            }}
                        >
                            New Arrivals
                        </span>
                        <span
                            className="block h-px bg-[#1C1C1C] opacity-40"
                            style={{ width: "clamp(28px, 6vw, 60px)" }}
                        />
                    </div>

                    {/* FLOREAL COLLECTION — main heading */}
                    <h1
                        className="text-[#030303] font-bold leading-none tracking-widest mb-3 sm:mb-4"
                        style={{
                            fontFamily: '"Expletus Sans", serif',
                            fontSize: "clamp(23px, 6.5vw, 42px)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                        }}
                    >
                        Floreal Collection
                    </h1>

                    {/* Tagline */}
                    <p
                        className="text-[#1C1C1C] tracking-widest opacity-70 mb-0"
                        style={{
                            fontFamily: '"Expletus Sans", serif',
                            fontSize: "clamp(9px, 1.5vw, 14px)",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            fontWeight: 400,
                        }}
                    >
                        Designed for every version of you.
                    </p>
                </div>

                {/* ── Dress carousel — fully isolated ───────────────────────── */}
                <div className="relative z-10 w-full pt-5 lg:pt-8">
                    <CarouselDress
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                </div>

                {/* ── Shop Now CTA ───────────────────────────────────────────── */}
                <div
                    className="relative z-10 flex justify-center"
                    style={{ marginTop: "clamp(16px, 3vw, 328px)" }}
                >
                    <Link
                        href="/shop"
                        className="inline-flex items-center justify-center
    font-semibold uppercase tracking-[0.2em] text-[#1a1a1a] no-underline
    bg-transparent border border-black rounded-full
    px-[clamp(22px,4vw,52px)] py-[clamp(6px,1.6vw,15px)]
    text-[clamp(11px,1.5vw,18px)]
    backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.06)]
    transition-all duration-300
    hover:bg-black hover:text-white 
    hover:-translate-y-0.5"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </section>
    );
}