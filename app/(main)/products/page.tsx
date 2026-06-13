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


const COLLECTION_MAP: Record<string, string> = {
  "FLOREAL COLLECTION": "floreal-collection",
  "ZAYELLE LUXE WEAVE": "ember-collection",
  "NEW ARRIVALS":       "new-arrivals",
};

function ProductsContent() {
  const { currency } = useCurrencyStore();
const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [products,     setProducts]     = useState<Product[]>([]);
  const [isLoading,    setIsLoading]    = useState(false);

  // ── Fetch all products ─────────────────────────────────────────
  const fetchAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getProducts();
      if (response.products.length) setProducts(response.products);
    } catch {
        console.error("Error fetching all products");
      // handle silently
    } finally {
      setIsLoading(false);
    }
  };

  // ── Fetch by collection ────────────────────────────────────────
  const fetchByCollection = async (slug: string) => {
    setIsLoading(true);
    try {
      const response = await getProductByCollection(slug);
      if (response.products.length) setProducts(response.products);
    } catch {
      // handle silently
    } finally {
      setIsLoading(false);
    }
  };

 useEffect(() => {
  const collection = searchParams.get("collection");

  if (collection) {
    const filterKey = Object.keys(COLLECTION_MAP).find(
      key => COLLECTION_MAP[key] === collection
    );
    if (filterKey) {
      setActiveFilter(filterKey);
      fetchByCollection(collection); // use collection slug directly
    }
  } else {
    setActiveFilter("ALL");
    fetchAllProducts();
  }
}, [currency,searchParams]);

  // ── Filter change ──────────────────────────────────────────────
  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setProducts([]);

    if (filter === "ALL") {
      fetchAllProducts();
    } else {
      const slug = COLLECTION_MAP[filter];
      if (slug) fetchByCollection(slug);
    }
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