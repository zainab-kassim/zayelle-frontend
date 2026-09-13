"use client";

import Link from "next/link";
import CarouselDress from "@/components/ui/CarouselDress";

export default function DressSpotlight() {
    return (
        <section
            className="relative w-full flex flex-col items-center overflow-hidden rounded-3xl bg-surface pt-10 sm:pt-14 pb-8 sm:pb-10 px-4"
            aria-label="Floreal Collection spotlight"
        >
            <div className="relative z-10 w-full flex flex-col items-center text-center max-w-xl">
                <span className="font-sans text-muted tracking-[0.22em] uppercase text-[11px] sm:text-[12px] font-semibold mb-2 sm:mb-3">
                    A Closer Look
                </span>
                <h2 className="font-serif text-ink leading-[1.15] text-[24px] sm:text-[32px] md:text-[38px] font-medium">
                    Three silhouettes, <span className="italic">one collection</span>
                </h2>
            </div>

            <div className="relative z-10 w-full pt-4 sm:pt-6">
                <CarouselDress />
            </div>

            <div className="relative z-10 mt-2 sm:mt-4">
                <Link
                    href="/products?collection=floreal-collection"
                    className="inline-flex items-center justify-center gap-2
                        font-sans font-semibold uppercase tracking-[0.16em] text-white no-underline
                        bg-button-primary rounded-full
                        px-8 sm:px-10 py-3.5 sm:py-4
                        text-[11px] sm:text-[12px]
                        shadow-[0_8px_24px_rgba(26,20,16,0.18)]
                        transition-all duration-300
                        hover:bg-button-primary-active
                        hover:-translate-y-0.5"
                >
                    Shop The Edit
                </Link>
            </div>
        </section>
    );
}
