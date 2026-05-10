'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import ProductCardSkeleton from '@/components/ui/ProductCardSkeleton';
import { getProductByCollection } from '@/services/products';
import { Product } from '@/types/product';


export default function FloralCollection() {
  const router = useRouter();
const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProductByCollection();
       const fetchedProducts = response
        if (fetchedProducts.length) {
          setProducts(fetchedProducts);
        }
      } catch {
        // API not ready — fallback to dummy data already set
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="w-full bg-white px-6 md:px-12 lg:px-36 py-12">

      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2
          className="text-[14px] md:text-[18px] font-bold uppercase text-[#2C2420]"
          style={{ fontFamily: "'Cairo', sans-serif" }}
        >
          Floreal Collection
        </h2>
        <button
          onClick={() => router.push('/products')}
          className="text-[12px] md:text-[14px] uppercase text-[#C2583A] cursor-pointer bg-transparent border-none"
        >
          See All
        </button>
      </div>

      {/* Desktop — 3 cards in a row */}
      <div className="hidden lg:flex flex-row gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-1">
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="flex-1">
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              </div>
            ))}
      </div>

      {/* Mobile — horizontally scrollable */}
      <div
        className="flex lg:hidden flex-row gap-4"
        style={{
          overflowX: 'scroll',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <style>{`
          .scroll-hide::-webkit-scrollbar { display: none; }
        `}</style>
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[58vw] max-w-[220px]">
                <ProductCardSkeleton />
              </div>
            ))
          : products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[58vw] max-w-[220px]">
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                />
              </div>
            ))}
      </div>

    </section>
  );
}