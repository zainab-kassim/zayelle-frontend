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
            className="group relative w-full aspect-[1/1] overflow-hidden rounded-2xl bg-surface flex flex-col"
        >
            <div className="relative flex-1 min-h-0">
                {isLoading ? (
                    <div className="absolute inset-0 animate-pulse bg-line/40" />
                ) : image ? (
                    <div className="absolute inset-8 sm:inset-9">
                        <Image
                            src={image}
                            alt={label}
                            fill
                            className="object-contain transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                            sizes="(max-width: 640px) 90vw, 33vw"
                        />
                    </div>
                ) : null}
            </div>

            <div className="flex items-center justify-between gap-2 px-5 py-3 sm:px-6 sm:py-3.5 border-t border-line">
                <span className="font-serif text-ink text-[14px] sm:text-[15px] font-normal tracking-normal">
                    {label}
                </span>
                <span className="font-sans text-muted uppercase tracking-[0.14em] text-[10px] whitespace-nowrap transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink border-b border-line group-hover:border-ink pb-0.5">
                    Shop
                </span>
            </div>
        </Link>
    );
}

export default function CategoryShowcase() {
    return (
        <section className="w-full" aria-label="Shop by collection">
            <div className="mb-5 sm:mb-6">
                <span className="font-sans block text-muted font-medium uppercase tracking-[0.2em] text-[10px] sm:text-[11px] mb-2">
                    Shop by Collection
                </span>
                <h2 className="font-serif text-ink font-normal text-[18px] sm:text-[25px] md:text-[28px] tracking-normal leading-[1.18]">
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
