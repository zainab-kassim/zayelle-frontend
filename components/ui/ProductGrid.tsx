"use client";

import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "@/components/ui/CardSkeleton";
import { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

// one grid for every breakpoint: 2 cols phone, 3 tablet, 4 desktop
const IMAGE_HEIGHT = "h-[190px] sm:h-[210px] xl:h-[250px]";

export default function ProductGrid({
  products,
  isLoading,
}: ProductGridProps) {
  if (!isLoading && products.length === 0) {
    return (
      <div className="w-full py-20 flex flex-col items-center text-center gap-2">
        <p className="font-serif text-ink text-[18px] sm:text-[20px]">
          No products found
        </p>
        <p className="font-sans text-muted text-[13px] max-w-sm">
          Try adjusting your filters, or check back soon — new pieces are added regularly.
        </p>
      </div>
    );
  }

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
