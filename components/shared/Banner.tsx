"use client";

import Image from "next/image";
import Link from "next/link";

export default function BestSellerBanner() {
    return (
        <section className="w-full md:mt-8 lg:mt-10">
            <div
                className="
          relative w-full overflow-visible rounded-2xl
          flex items-stretch
          min-h-[155px] h-[32vw] max-h-[400px]
        "
            >
                {/* ── Background — clipped to card shape ─────────── */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden" aria-hidden="true">
                    <Image
                        src="https://images.unsplash.com/photo-1588345921586-7408ea1b2c3c?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdoaXRlJTIwYWJzdHJhY3R8ZW58MHx8MHx8fDA%3D"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                </div>

                {/* ── Content row ──────────────────────────────────────────── */}
                <div className="relative z-10 flex w-full items-center">

                    {/* Left — text block */}
                    <div className="flex flex-col justify-center gap-1 sm:gap-1.5 md:gap-2 px-4 sm:px-10 md:px-14 py-3 sm:py-4 md:py-6 flex-1 min-w-0">

                        {/* Eyebrow */}
                        <span className="font-sans text-ink tracking-[0.12em] sm:tracking-[0.24em] uppercase text-[8px] sm:text-[10px] md:text-[11px] font-normal">
                            The Edit
                        </span>

                        {/* Title */}
                        <h2 className="font-serif text-ink font-medium leading-[1.18] text-[14px] sm:text-[20px] md:text-[25px] lg:text-[28px]">
                            Back by <span className="italic">request</span>
                        </h2>

                        {/* Subtitle */}
                        <p className="font-sans text-ink/70 tracking-[0.07em] sm:tracking-[0.14em] uppercase text-[8px] sm:text-[10px] md:text-[11px]">
                            Zayelle Luxe Weave
                        </p>

                        {/* CTA */}
                        <Link
                            href="/products?collection=ember-collection"
                            className="
                self-start mt-2 sm:mt-4 md:mt-5
                inline-flex items-center justify-center gap-2
                font-sans font-normal uppercase tracking-[0.08em] sm:tracking-[0.16em] text-ink no-underline
                bg-transparent border-[0.5px] border-ink rounded-full
                px-3 sm:px-8 md:px-10 py-1.5 sm:py-3.5 md:py-4
                text-[7px] sm:text-[10px] md:text-[11px]
                transition-all duration-300
                hover:bg-ink hover:text-paper
                hover:-translate-y-0.5
              "
                        >
                            Explore The Edit
                        </Link>
                    </div>

                    {/*
           * Right — model image
           * ───────────────────────────────────────────────────────────
           * overflow-visible on the section + items-end here so the PNG
           * can bleed above and below the card for the pop-out effect.
           */}
                    <div
                        className="relative flex-shrink-0 self-end mr-2 sm:mr-7 lg:mr-14"
                        style={{
                            width: "clamp(140px, 25vw, 380px)",
                            height: "clamp(185px, 36vw, 460px)",
                        }}
                    >
                        <Image
                            src="https://oqk3pkp15w.ufs.sh/f/H3vgRA928TvFws1B4DxvR4hEVegOsqMPFdpio21DQzU9H05G"
                            alt="Zayelle Luxe Weave, two models wearing the collection"
                            fill
                            className="object-contain object-bottom"
                            sizes="(max-width: 640px) 140px, (max-width: 900px) 36vw, 420px"
                            priority
                        />
                    </div>

                </div>{/* /content row */}
            </div>{/* /card */}
        </section>
    );
}
