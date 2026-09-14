"use client";

import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/CardSkeleton";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

// One grid for every breakpoint — 2 columns on phones, 3 from tablet up, 4
// on wide desktop — replacing the old split between a desktop-only grid and
// a completely different mobile "stacked collection rows" component. Same
// smaller image frames as the rest of this listing-page pass.
const IMAGE_HEIGHT = "h-[190px] sm:h-[210px] xl:h-[250px]";

export default function ProductGrid({
  products,
  isLoading,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-5 gap-y-8">
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <ProductCardSkeleton key={i} heightClassName={IMAGE_HEIGHT} />
          ))
        : products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              slug={product.slug}
              showQuickAdd={false}
              imageHeightClassName={IMAGE_HEIGHT}
              imageWrapperClassName="relative pb-3 z-0"
              nameClassName="text-[10px] tracking-[0.05em]"
              priceClassName="text-[12px] sm:text-[13px]"
              isNew={product.collections?.slug === "new-arrivals"}
            />
          ))}
    </div>
  );
}
