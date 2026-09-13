"use client";

import Link from "next/link";
import CarouselDress from "@/components/ui/CarouselDress";

export default function DressSpotlight() {
    return (
        <section
            className="relative w-full flex flex-col items-center overflow-hidden rounded-3xl bg-surface pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6"
            aria-label="Floreal Collection spotlight"
        >
            <div className="relative z-10 w-full flex flex-col items-center text-center max-w-xl">
                <span className="font-sans text-muted tracking-[0.22em] uppercase text-[11px] sm:text-[12px] font-semibold mb-2 sm:mb-3">
                    A Closer Look
                </span>
                <h2 className="font-serif text-ink leading-[1.15] text-[24px] sm:text-[30px] md:text-[34px] font-medium">
                    Three silhouettes, <span className="italic">one collection</span>
                </h2>
            </div>

            <div className="relative z-10 w-full pt-6 sm:pt-8 md:pt-10">
                <CarouselDress />
            </div>

            <div className="relative z-10 mt-6 sm:mt-8">
                <Link
                    href="/products?collection=floreal-collection"
                    className="inline-flex items-center justify-center gap-2
                        font-sans font-semibold uppercase tracking-[0.16em] text-paper no-underline
                        bg-ink rounded-full
                        px-8 sm:px-10 py-3.5 sm:py-4
                        text-[11px] sm:text-[12px]
                        shadow-[0_8px_24px_rgba(23,19,16,0.18)]
                        transition-all duration-300
                        hover:opacity-90
                        hover:-translate-y-0.5"
                >
                    Shop The Edit
                </Link>
            </div>
        </section>
    );
}
