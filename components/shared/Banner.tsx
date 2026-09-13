"use client";

import Image from "next/image";
import Link from "next/link";

export default function BestSellerBanner() {
    return (
        <section className="w-full pt-4 pb-6">
            <div
                className="
          relative w-full overflow-visible rounded-3xl
          flex items-stretch
          min-h-[260px] h-[42vw] max-h-[480px]
        "
            >
                {/* ── Background — clipped to card shape ─────────── */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden" aria-hidden="true">
                    <Image
                        src="https://images.unsplash.com/photo-1744658841145-10f531c1e218?q=80&w=2400&auto=format&fit=crop"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(115deg, rgba(23,19,16,0.92) 0%, rgba(42,33,25,0.88) 55%, rgba(59,42,24,0.80) 100%)",
                        }}
                    />
                </div>

                {/* ── Content row ──────────────────────────────────────────── */}
                <div className="relative z-10 flex w-full items-center">

                    {/* Left — text block */}
                    <div className="flex flex-col justify-center gap-[clamp(6px,1.5vw,16px)] px-4 sm:px-10 md:px-14 py-[clamp(14px,2.5vw,32px)] flex-1 min-w-0">

                        {/* Eyebrow */}
                        <span className="font-sans text-white/70 tracking-[0.22em] uppercase text-[10px] sm:text-[12px] font-medium">
                            The Edit
                        </span>

                        {/* Title */}
                        <h2 className="font-serif text-white font-medium leading-[1.1]" style={{ fontSize: "clamp(22px, 4.4vw, 52px)" }}>
                            Back by <span className="italic">request</span>
                        </h2>

                        {/* Subtitle */}
                        <p className="font-sans text-white/70 tracking-[0.12em] uppercase text-[11px] sm:text-[13px]">
                            Zayelle Luxe Weave
                        </p>

                        {/* CTA */}
                        <Link
                            href="/products?collection=ember-collection"
                            className="
                self-start mt-[clamp(4px,1vw,14px)]
                inline-flex items-center justify-center
                rounded-full
                bg-white text-ink font-sans font-semibold uppercase
                tracking-[0.18em] no-underline
                transition-all duration-300
                hover:bg-white/90
                hover:-translate-y-0.5
              "
                            style={{
                                fontSize: "clamp(10px, 1.1vw, 13px)",
                                padding: "clamp(10px,1.2vw,15px) clamp(22px,2.8vw,36px)",
                            }}
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
                        className="relative flex-shrink-0 self-end mr-2 sm:mr-8 lg:mr-16"
                        style={{
                            width: "clamp(150px, 27vw, 400px)",
                            height: "clamp(200px, 40vw, 500px)",
                        }}
                    >
                        <Image
                            src="https://oqk3pkp15w.ufs.sh/f/H3vgRA928TvFws1B4DxvR4hEVegOsqMPFdpio21DQzU9H05G"
                            alt="Zayelle Luxe Weave — two models wearing the collection"
                            fill
                            className="object-contain object-bottom"
                            sizes="(max-width: 640px) 150px, (max-width: 900px) 38vw, 440px"
                            priority
                        />
                    </div>

                </div>{/* /content row */}
            </div>{/* /card */}
        </section>
    );
}
