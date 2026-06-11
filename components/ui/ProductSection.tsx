// components/ProductListing/ProductSection.tsx
"use client";

import ProductListingCard from "@/components/ui/ProductListingCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { Product } from "@/types/product";

interface ProductSectionProps {
  title: string;
  products: Product[];
  isLoading: boolean;
}

export default function ProductSection({
  title,
  products,
  isLoading,
}: ProductSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section heading — always visible */}
      <h2
        className="text-[12px] sm:text-[14px] font-bold tracking-[0.10em] uppercase text-[#1a1a1a] border-b border-[#ebebeb] pb-3"
        style={{ fontFamily: '"Expletus Sans", serif' }}
      >
        {title}
      </h2>

      {/* Horizontally scrollable product row */}
      <div
        className="flex flex-row gap-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[58vw] max-w-[260px]">
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div className="flex-shrink-0 w-[58vw] max-w-[260px]">
                <ProductListingCard key={product.id}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                />
              </div>
            ))}
      </div>
    </div>
  );
}