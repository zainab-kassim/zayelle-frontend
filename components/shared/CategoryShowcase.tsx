"use client";

import Link from "next/link";
import Image from "next/image";
import { useAsyncData } from "@/hooks/UseAsyncData";
import { getProductByCollection } from "@/services/product.service";

interface CategoryTile {
    slug: string;
    label: string;
}

const CATEGORIES: CategoryTile[] = [
    { slug: "floreal-collection", label: "Floreal Collection" },
    { slug: "ember-collection", label: "Zayelle Luxe Weave" },
    { slug: "new-arrivals", label: "New Arrivals" },
];

function CategoryTile({ slug, label }: CategoryTile) {
    // Uses the collection's own first product image, so the tile always
    // reflects what's actually in that collection.
    const { data: image, isLoading } = useAsyncData<string | null>(
        () => getProductByCollection(slug).then((res) => res.products[0]?.image?.[0] ?? null),
        [slug],
        null
    );

    return (
        <Link
            href={`/products?collection=${slug}`}
            className="group relative w-full aspect-[7/8] sm:aspect-[5/6] overflow-hidden rounded-2xl bg-[#FCFCFB]"
        >
            {isLoading ? (
                <div className="absolute inset-0 animate-pulse bg-[#F2F2F0]" />
            ) : image ? (
                <div className="absolute inset-9 sm:inset-11">
                    <Image
                        src={image}
                        alt={label}
                        fill
                        className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        sizes="(max-width: 640px) 90vw, 33vw"
                    />
                </div>
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5 sm:p-6">
                <span
                    className="text-white font-bold uppercase"
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "clamp(13px, 1.7vw, 17px)",
                        letterSpacing: "0.02em",
                    }}
                >
                    {label}
                </span>
                <span
                    className="text-white uppercase tracking-[0.14em] whitespace-nowrap opacity-90 transition-transform duration-300 group-hover:translate-x-1"
                    style={{ fontFamily: "Cairo, sans-serif", fontSize: "11px" }}
                >
                    Shop →
                </span>
            </div>
        </Link>
    );
}

export default function CategoryShowcase() {
    return (
        <section className="w-full py-3 sm:py-4" aria-label="Shop by collection">
            <div className="mb-5 sm:mb-6">
                <span
                    className="block text-[#6b6b6b] font-semibold mb-1"
                    style={{
                        fontFamily: "Cairo, sans-serif",
                        fontSize: "11px",
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                    }}
                >
                    Shop by Collection
                </span>
                <h2
                    className="text-[#1a1410] font-bold uppercase"
                    style={{
                        fontFamily: '"Poppins", sans-serif',
                        fontSize: "clamp(16px, 2.6vw, 22px)",
                        letterSpacing: "0.01em",
                    }}
                >
                    Find Your Fit
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                {CATEGORIES.map((cat) => (
                    <CategoryTile key={cat.slug} {...cat} />
                ))}
            </div>
        </section>
    );
}
