"use client";

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
    return (
        <section
            className="relative w-full overflow-hidden rounded-3xl mt-6 h-[560px] sm:h-[640px] md:h-[720px] flex items-end"
            aria-label="Zayelle hero"
        >
            <Image
                src="https://images.unsplash.com/photo-1662532577856-e8ee8b138a8b?q=80&w=2400&auto=format&fit=crop"
                alt="Zayelle — designed for every version of you"
                fill
                priority
                className="object-cover object-[50%_12%]"
                sizes="100vw"
            />

            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(0deg, rgba(10,8,6,0.72) 0%, rgba(10,8,6,0.28) 42%, rgba(10,8,6,0.05) 65%, transparent 100%)",
                }}
            />

            {/* ── Content block ─────────────────────────────────────── */}
            <div className="relative z-10 w-full flex flex-col items-start text-left max-w-2xl px-6 sm:px-10 md:px-14 pb-10 sm:pb-14 md:pb-16">

                {/* Eyebrow */}
                <span className="font-sans text-white/85 tracking-[0.24em] uppercase text-[11px] sm:text-[12px] font-medium mb-3 sm:mb-4">
                    New Season · Floreal Collection
                </span>

                {/* Headline */}
                <h1 className="font-serif text-white leading-[1.08] mb-4 sm:mb-5 text-[34px] sm:text-[48px] md:text-[62px] font-medium">
                    Designed for every
                    <br />
                    <span className="italic">version of you</span>
                </h1>

                {/* Subtext */}
                <p className="font-sans text-white/80 text-[13px] sm:text-[15px] max-w-md mb-7 sm:mb-9 leading-relaxed">
                    Fashion built for how you actually live — with custom pieces
                    tailored around you, wherever you are.
                </p>

                {/* CTA */}
                <Link
                    href="/products?collection=floreal-collection"
                    className="inline-flex items-center justify-center gap-2
                        font-sans font-semibold uppercase tracking-[0.16em] text-ink no-underline
                        bg-white rounded-full
                        px-8 sm:px-10 py-3.5 sm:py-4
                        text-[11px] sm:text-[12px]
                        shadow-[0_8px_24px_rgba(0,0,0,0.25)]
                        transition-all duration-300
                        hover:bg-ink hover:text-white
                        hover:-translate-y-0.5"
                >
                    Shop The Collection
                </Link>
            </div>
        </section>
    );
}
