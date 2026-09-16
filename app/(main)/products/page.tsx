"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useCurrencyStore } from "@/store/currencyStore";
import { getProductByCollection } from "@/services/product.service";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import SidebarFilters from "@/components/ui/SidebarFilters";
import MobileFilterDrawer from "@/components/ui/MobileFilterDrawer";
import FilterIcon from "@/components/ui/FilterIcon";
import ProductGrid from "@/components/ui/ProductGrid";
import { SortOption, COLLECTIONS } from "@/components/ui/FilterPanelContent";
import { useSearchParams } from "next/navigation";
import { useAsyncData } from "@/hooks/UseAsyncData";

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  if (sortBy === "featured") return products;
  const direction = sortBy === "price-asc" ? 1 : -1;
  return [...products].sort((a, b) => direction * (Number(a.price) - Number(b.price)));
}

function ProductsContent() {
  const { currency } = useCurrencyStore();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // The URL's ?collection= param re-syncs the active filter whenever it
  // changes, taking priority over any manual sidebar selection.
  useEffect(() => {
    const collection = searchParams.get("collection");
    const match = collection ? COLLECTIONS.find((c) => c.slug === collection) : null;
    setActiveFilter(match ? match.label : "ALL");
  }, [searchParams]);

  const collectionSlug = COLLECTIONS.find((c) => c.label === activeFilter)?.slug ?? null;

  const { data: products, isLoading } = useAsyncData(
    () =>
      (collectionSlug ? getProductByCollection(collectionSlug) : getProducts()).then(
        (res) => res.products
      ),
    [currency, collectionSlug],
    [] as Product[]
  );

  // Sizes offered in the filter reflect whatever's actually in the current
  // collection, not a fixed/fake list.
  const availableSizes = useMemo(
    () => Array.from(new Set(products.flatMap((p) => p.size))).sort(),
    [products]
  );

  const visibleProducts = useMemo(() => {
    const bySize = selectedSizes.length === 0
      ? products
      : products.filter((p) => p.size.some((s) => selectedSizes.includes(s)));
    return sortProducts(bySize, sortBy);
  }, [products, selectedSizes, sortBy]);

  const activeFilterCount =
    (activeFilter !== "ALL" ? 1 : 0) + (sortBy !== "featured" ? 1 : 0) + selectedSizes.length;

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleReset = () => {
    setActiveFilter("ALL");
    setSortBy("featured");
    setSelectedSizes([]);
  };

  const filterPanelProps = {
    activeFilter,
    onFilterChange: setActiveFilter,
    sortBy,
    onSortChange: setSortBy,
    availableSizes,
    selectedSizes,
    onSizeToggle: handleSizeToggle,
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-12">
      <div className="flex flex-row gap-12">
        <SidebarFilters {...filterPanelProps} onReset={handleReset} />

        <div className="flex-1 min-w-0">
          {/* Toolbar — product count, plus the mobile filter trigger (the
              sidebar is desktop-only from lg: up). */}
          <div className="flex items-center justify-between mb-4">
            {/* Always rendered, even while loading (with a non-breaking
                placeholder) — hiding it entirely collapsed this row's height
                to zero and threw off the alignment with the sidebar next to
                it. */}
            <p className="font-sans text-muted font-medium text-[11px] uppercase tracking-[0.1em]">
              {isLoading
                ? " "
                : `${visibleProducts.length} ${visibleProducts.length === 1 ? "Product" : "Products"}`}
            </p>
            <button
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden ml-auto inline-flex items-center gap-2 border border-line rounded-full px-4 py-2 font-sans text-ink font-medium text-[11px] uppercase tracking-[0.1em]"
            >
              <FilterIcon />
              Filter
              {activeFilterCount > 0 && (
                <span className="flex items-center justify-center w-4 h-4 rounded-full bg-ink text-paper text-[9px] leading-none">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <ProductGrid products={visibleProducts} isLoading={isLoading} />
        </div>
      </div>

      <MobileFilterDrawer
        {...filterPanelProps}
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        onReset={handleReset}
        resultCount={visibleProducts.length}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}
