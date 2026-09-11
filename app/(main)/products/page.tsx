"use client";

import { useState, useEffect } from "react";
import { useCurrencyStore } from "@/store/currencyStore";
import {  getProductByCollection } from "@/services/product.service";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import SidebarFilters from "@/components/ui/SidebarFilters";
import DesktopProductGrid from "@/components/ui/DesktopProductGrid";
import MobileCollections from "@/components/shared/MobileCollections";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAsyncData } from "@/hooks/UseAsyncData";


const COLLECTION_MAP: Record<string, string> = {
  "FLOREAL COLLECTION": "floreal-collection",
  "ZAYELLE LUXE WEAVE": "ember-collection",
  "NEW ARRIVALS":       "new-arrivals",
};

function ProductsContent() {
  const { currency } = useCurrencyStore();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("ALL");

  // The URL's ?collection= param re-syncs the active filter whenever it (or
  // currency) changes, taking priority over any manual sidebar selection —
  // same precedence the previous single fetch-effect had.
  useEffect(() => {
    const collection = searchParams.get("collection");

    if (collection) {
      const filterKey = Object.keys(COLLECTION_MAP).find(
        key => COLLECTION_MAP[key] === collection
      );
      if (filterKey) setActiveFilter(filterKey);
    } else {
      setActiveFilter("ALL");
    }
  }, [searchParams, currency]);

  const collectionSlug = activeFilter === "ALL" ? null : COLLECTION_MAP[activeFilter];

  const { data: products, isLoading } = useAsyncData(
    () =>
      (collectionSlug ? getProductByCollection(collectionSlug) : getProducts()).then(
        (res) => res.products
      ),
    [currency, collectionSlug],
    [] as Product[]
  );

  // ── Filter change ──────────────────────────────────────────────
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-10">
      {/* ── Desktop layout ── */}
      <div className="hidden md:flex flex-row gap-12">
        <SidebarFilters
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <div 
    className="flex-1 overflow-y-auto max-h-[calc(100vh-90px)]"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    <DesktopProductGrid
      products={products}
      isLoading={isLoading}
    />
  </div>
      </div>

      {/* ── Mobile layout ── */}
      <MobileCollections />

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