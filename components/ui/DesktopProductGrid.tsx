// components/ProductListing/DesktopProductGrid.tsx
"use client";

import ProductListCard from "@/components/ui/ProductListingCard";
import ProductCardSkeleton from "@/components/ui/ProductCardSkeleton";
import { Product } from "@/types/product";

interface DesktopProductGridProps {
  products: Product[];
  isLoading: boolean;
}

export default function DesktopProductGrid({
  products,
  isLoading,
}: DesktopProductGridProps) {
  return (
    <div className="hidden lg:grid grid-cols-3 gap-6 flex-1">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : products.map((product) => (
            <ProductListCard
              key={product.id}
              id={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              slug={product.slug}
            />
          ))}
    </div>
  );
}