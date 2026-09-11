"use client";

import { useCurrencyStore } from "@/store/currencyStore";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import ProductSection from "@/components/ui/ProductSection";
import { useAsyncData } from "@/hooks/UseAsyncData";

export default function MobileCollections() {
  const { currency } = useCurrencyStore();

  const { data: products, isLoading } = useAsyncData(
    () => getProducts().then((res) => res.products),
    [currency],
    [] as Product[]
  );

  const florealProducts = products.filter(p => p.collections.slug === "floreal-collection");
  const emberProducts = products.filter(p => p.collections.slug === "ember-collection");
  const newArrivalProducts = products.filter(p => p.collections.slug === "new-arrivals");

  return (
    <div className="flex lg:hidden flex-col gap-10 px-4">
      <ProductSection
        title="Floreal Collection"
        products={florealProducts}
        isLoading={isLoading}
      />
      <ProductSection 
        title="Zayelle Luxe Weave"
        products={emberProducts}
        isLoading={isLoading}
      />
      <ProductSection 
        title="New Arrivals"
        products={newArrivalProducts}
        isLoading={isLoading}
      />
    </div>
  );
}