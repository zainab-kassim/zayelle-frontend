"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * BestSellerBanner
 *
 * Files expected in /public:
 *   /images/banner-bg.jpg      — warm beige/cream background (or swap for your own)
 *   /images/banner-models.png  — PNG of the two models (transparent bg)
 *
 * Fonts expected in layout.tsx / globals.css:
 *   Expletus Sans — used for headings
 *   Cairo         — used for CTA
 */
export default function BestSellerBanner() {
    return (
        <section className="w-full  py-4">
            {/*
       * Card container
       * ─────────────────────────────────────────────────────────────
       * overflow-visible  → model image can bleed above the card
       * relative          → anchors the background image
       * rounded-2xl       → matches the Figma card shape
       */}
            <div
                className="
          relative w-full overflow-visible rounded-2xl
          flex items-stretch
          min-h-[155px] h-[32vw] max-h-[400px]
        "
            >
                {/* ── Background + overlay — clipped to card shape ─────────── */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1734216736346-b87e2e0ac8db?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="banner background — warm beige textured"
                        fill
                        className="object-cover object-center"
                        priority
                        aria-hidden="true"
                    />
                    {/* Warm sandy overlay */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(100deg, rgba(220,185,148,0.55) 0%, rgba(200,165,125,0.3) 50%, rgba(180,145,105,0.1) 100%)",
                        }}
                        aria-hidden="true"
                    />
                </div>


                {/* ── Content row ──────────────────────────────────────────── */}
                <div className="relative z-10 flex w-full items-center">

                    {/* Left — text block */}
                    <div className="flex flex-col justify-center gap-[clamp(4px,1.5vw,14px)] px-4 sm:px-10 md:px-14 py-[clamp(14px,2.5vw,32px)] flex-1 min-w-0">

                        {/* Title */}
                        <h2
                            className="text-[#3b2a18] font-bold leading-tight uppercase"
                            style={{
                                fontFamily: '"Expletus Sans", serif',
                                fontSize: "clamp(16px, 3vw, 45px)",
                                letterSpacing: "0.01em",
                                lineHeight: "1.2",
                            }}
                        >
                            Best Seller&nbsp;·&nbsp;Back
                            <br />
                            By Request
                        </h2>

                        {/* Subtitle */}
                        <p
                            className="text-[#6b4e2e] tracking-widest uppercase"
                            style={{
                                fontFamily: '"Expletus Sans", serif',
                                fontSize: "clamp(6px, 1vw, 13px)",
                                fontWeight: 400,
                                letterSpacing: "0.2em",
                            }}
                        >
                            Zayelle Luxe Weave
                        </p>

                        {/* CTA */}
                        <Link
                            href="/products/ember-collection"
                            className="
                self-start mt-[clamp(2px,0.8vw,10px)]
                inline-flex items-center justify-center
                border border-[#3b2a18]/40 rounded-full
                bg-transparent text-[#3b2a18] font-semibold uppercase
                tracking-[0.2em] no-underline
                transition-all duration-300
                hover:bg-[#3b2a18]/8 hover:border-[#3b2a18]/70
                hover:-translate-y-0.5
              "
                            style={{
                                fontFamily: "Cairo, sans-serif",
                                fontSize: "clamp(6px, 1.1vw, 16px)",
                                padding: "clamp(6px,1vw,12px) clamp(16px,2.5vw,32px)",
                            }}
                        >
                            Explore
                        </Link>
                    </div>

                    {/*
           * Right — model image
           * ───────────────────────────────────────────────────────────
           * overflow-visible on the section + items-end here so the PNG
           * can bleed above and below the card for the pop-out effect.
           * The negative bottom margin pulls it slightly out of frame.
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
                            alt="Zayelle Luxe Weave — two models wearing the collection"
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