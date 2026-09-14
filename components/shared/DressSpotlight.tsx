"use client";

import Link from "next/link";
import CarouselDress from "@/components/ui/CarouselDress";

export default function DressSpotlight() {
    return (
        <section
            className="relative w-full flex flex-col items-center overflow-hidden rounded-3xl bg-surface pt-10 sm:pt-14 pb-10 sm:pb-14 px-4 sm:px-6"
            aria-label="Floreal Collection spotlight"
        >
            <div className="relative z-10 w-full flex flex-col items-center text-center max-w-xl">
                <span className="font-sans text-muted tracking-[0.2em] uppercase text-[10px] sm:text-[11px] font-medium mb-2 sm:mb-2.5">
                    A Closer Look
                </span>
                <h2 className="font-serif text-ink leading-[1.18] text-[18px] sm:text-[25px] md:text-[28px] font-normal">
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
                        font-sans font-normal uppercase tracking-[0.1em] text-ink no-underline
                        bg-transparent border border-ink/25 rounded-full
                        px-7 sm:px-9 py-3 sm:py-3.5
                        text-[11px] sm:text-[12px]
                        transition-all duration-300
                        hover:bg-ink hover:text-paper hover:border-ink
                        hover:-translate-y-0.5"
                >
                    Shop The Edit
                </Link>
            </div>
        </section>
    );
}
