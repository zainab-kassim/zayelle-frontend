'use client';

import { useRouter } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';
import ProductCardSkeleton from '@/components/ui/CardSkeleton';
import { getProductByCollection } from '@/services/product.service';
import { Product } from '@/types/product';
import { useCurrencyStore } from '@/store/currencyStore';
import { useAsyncData } from '@/hooks/UseAsyncData';


interface FloralCollectionProps {
  collection: string;
}

export default function FloralCollection({ collection }: FloralCollectionProps) {
  const router = useRouter();
  const { currency } = useCurrencyStore();

  // currency changes → re-fetches → interceptor sends new header → backend returns new prices
  const { data: products, isLoading } = useAsyncData(
    () => getProductByCollection(collection).then((res) => res.products),
    [currency, collection],
    [] as Product[]
  );

  return (
    <section className="w-full bg-white  pt-1 sm:pb-5 sm:pt-5 mb-10 sm:mb-14 md:mb-16 lg:mb-20">

      {/* Section Header */}
      <div className=" text-right mb-3 sm:mb-5 px-2">
        <button
          onClick={() => router.push(`/products?collection=${collection}`)}
          className="text-[14px] md:text-[16px] uppercase text-[#C2583A] cursor-pointer bg-transparent border-none"
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
                slug={product.slug}
              />
            </div>
          ))}
      </div>

      {/* Mobile — horizontally scrollable */}
      <div
        className="flex lg:hidden flex-row gap-6 no-scrollbar"
        style={{
          overflowX: 'scroll',
          scrollbarWidth: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-[58vw] max-w-[280px]">
              <ProductCardSkeleton />
            </div>
          ))
          : products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[58vw] max-w-[280px]">
              <ProductCard
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                slug={product.slug}
              />
            </div>
          ))}
      </div>

    </section>
  );
}