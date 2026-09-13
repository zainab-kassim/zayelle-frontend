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
            className="group relative w-full aspect-[7/8] sm:aspect-[5/6] overflow-hidden rounded-2xl bg-surface"
        >
            {isLoading ? (
                <div className="absolute inset-0 animate-pulse bg-line/40" />
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5 sm:p-6">
                <span className="font-serif text-white text-[16px] sm:text-[19px] font-medium tracking-tight">
                    {label}
                </span>
                <span className="font-sans text-white uppercase tracking-[0.14em] text-[10px] sm:text-[11px] whitespace-nowrap opacity-90 transition-transform duration-300 group-hover:translate-x-1 border-b border-white/60 pb-0.5">
                    Shop
                </span>
            </div>
        </Link>
    );
}

export default function CategoryShowcase() {
    return (
        <section className="w-full py-3 sm:py-4" aria-label="Shop by collection">
            <div className="mb-5 sm:mb-6">
                <span className="font-sans block text-muted font-semibold uppercase tracking-[0.16em] text-[11px] mb-1.5">
                    Shop by Collection
                </span>
                <h2 className="font-serif text-ink font-medium text-[24px] sm:text-[30px] md:text-[34px] tracking-tight">
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
