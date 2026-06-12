"use client";

import { useState, useEffect } from "react";
import { useCurrencyStore } from "@/store/currencyStore";
import { getProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import ProductSection from "@/components/ui/ProductSection";

export default function MobileCollections() {
  const { currency } = useCurrencyStore();

  const [florealProducts, setFlorealProducts] = useState<Product[]>([]);
  const [emberProducts, setEmberProducts] = useState<Product[]>([]);
  const [newArrivalProducts, setNewArrivalProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAndGroup = async () => {
      setIsLoading(true);
      try {
        const { products } = await getProducts();

        setFlorealProducts(products.filter(p => p.collections.slug === "floreal-collection"));
        setEmberProducts(products.filter(p => p.collections.slug === "ember-collection"));
        setNewArrivalProducts(products.filter(p => p.collections.slug === "new-arrivals"));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAndGroup();
  }, [currency]);

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