"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section
            className="relative w-full overflow-hidden rounded-3xl mt-8 -mb-4 h-[480px] sm:h-[560px] md:h-[640px] flex items-end"
            aria-label="Zayelle hero"
        >
            <Image
                src="https://images.unsplash.com/photo-1543157145-f78c636d023d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Zayelle, designed for every version of you"
                fill
                priority
                className="object-cover object-[50%_12%]"
                sizes="100vw"
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(23,19,16,0.85) 0%, rgba(23,19,16,0.6) 18%, rgba(23,19,16,0.32) 36%, rgba(23,19,16,0.12) 55%, transparent 78%)",
                }}
            />

            {/* ── Content block ─────────────────────────────────────── */}
            <div className="relative z-10 w-full flex flex-col items-start text-left max-w-2xl px-6 sm:px-10 md:px-14 pb-8 sm:pb-12 md:pb-14">

                {/* Eyebrow */}
                <span className="font-sans text-paper tracking-[0.24em] uppercase text-[11px] sm:text-[12px] font-semibold mb-3 sm:mb-4">
                    New Season · Floreal Collection
                </span>

                {/* Headline */}
                <h1 className="font-serif text-paper leading-[1.1] mb-4 sm:mb-5 text-[32px] sm:text-[44px] md:text-[56px] font-medium">
                    Designed for every
                    <br />
                    <span className="italic">version of you</span>
                </h1>

                {/* Subtext */}
                <p className="font-sans text-paper/75 text-[13px] sm:text-[15px] max-w-md mb-6 sm:mb-8 leading-relaxed">
                    Fashion built for how you actually live, with custom pieces
                    tailored around you, wherever you are.
                </p>

                {/* CTA */}
                <Link
                    href="/products?collection=floreal-collection"
                    className="inline-flex items-center justify-center gap-2
                        font-sans font-semibold uppercase tracking-[0.16em] text-ink no-underline
                        bg-paper rounded-full
                        px-8 sm:px-10 py-3.5 sm:py-4
                        text-[11px] sm:text-[12px]
                        shadow-[0_8px_24px_rgba(23,19,16,0.3)]
                        transition-all duration-300
                        hover:bg-ink hover:text-paper
                        hover:-translate-y-0.5"
                >
                    Shop The Collection
                </Link>
            </div>
        </section>
    );
}
