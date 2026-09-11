"use client";

import Link from "next/link";
import CarouselDress from "@/components/ui/CarouselDress";

export default function HeroSection() {
    return (
        <section
            className="relative w-full flex flex-col items-center overflow-hidden rounded-3xl mt-10 pt-10 sm:pt-14 pb-8 sm:pb-10 px-4"
            aria-label="Zayelle hero"
        >
            <div
                className="absolute -inset-2 bg-[url('https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center blur-sm"
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 45% at 50% -5%, rgba(255,235,210,0.55) 0%, transparent 60%)",
                }}
            />

            {/* ── Header text block ─────────────────────────────────────── */}
            <div className="relative z-10 w-full flex flex-col items-center text-center max-w-2xl">

                {/* Eyebrow */}
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                    <span
                        className="block h-px bg-[#1C1C1C] opacity-30"
                        style={{ width: "clamp(30px, 6vw, 60px)" }}
                    />
                    <span
                        className="text-[#3f3f3f] tracking-[0.24em] font-semibold"
                        style={{
                            fontFamily: '"Poppins", sans-serif',
                            fontSize: "clamp(11px, 1.7vw, 15px)",
                            textTransform: "uppercase",
                        }}
                    >
                        New Arrivals · Floreal Collection
                    </span>
                    <span
                        className="block h-px bg-[#1C1C1C] opacity-30"
                        style={{ width: "clamp(30px, 6vw, 60px)" }}
                    />
                </div>

                {/* Headline */}
                <h1
                    className="text-[#3a3a3a] leading-[1.15] mb-2 sm:mb-3"
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "clamp(10px, 1.3vw, 12px)",
                        fontWeight: 300,
                        letterSpacing: "-0.01em",
                    }}
                >
                    Designed for Every Version of You
                    <span className="hidden sm:inline">, Made for Real Life</span>
                </h1>
            </div>

            {/* ── Dress carousel ─────────────────────────────────────────── */}
            <div className="relative z-10 w-full pt-2 sm:pt-3">
                <CarouselDress />
            </div>

            {/* ── CTA ────────────────────────────────────────────────────── */}
            <div className="relative z-10 mt-2 sm:-mt-6">
                <Link
                    href="/products?collection=floreal-collection"
                    className="inline-flex items-center justify-center gap-2
                        font-semibold uppercase tracking-[0.18em] text-white no-underline
                        bg-button-primary rounded-full
                        px-[clamp(28px,4vw,48px)] py-[clamp(12px,1.8vw,16px)]
                        text-[clamp(11px,1.4vw,13px)]
                        shadow-[0_8px_24px_rgba(26,20,16,0.18)]
                        transition-all duration-300
                        hover:bg-button-primary-active
                        hover:-translate-y-0.5"
                >
                    Shop Now
                </Link>
            </div>
        </section>
    );
}
