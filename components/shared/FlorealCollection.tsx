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
  eyebrow: string;
  title: string;
}

export default function FloralCollection({ collection, eyebrow, title }: FloralCollectionProps) {
  const router = useRouter();
  const { currency } = useCurrencyStore();

  // currency changes → re-fetches → interceptor sends new header → backend returns new prices
  const { data: products, isLoading } = useAsyncData(
    () => getProductByCollection(collection).then((res) => res.products),
    [currency, collection],
    [] as Product[]
  );

  return (
    <section className="w-full bg-white">

      {/* Section Header */}
      <div className="flex items-end justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <span
            className="block text-[#6b6b6b] font-semibold mb-1"
            style={{
              fontFamily: 'Cairo, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {eyebrow}
          </span>
          <h2
            className="text-[#1a1410] font-bold uppercase"
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: 'clamp(13px, 2.6vw, 22px)',
              letterSpacing: '0.01em',
            }}
          >
            {title}
          </h2>
        </div>

        <button
          onClick={() => router.push(`/products?collection=${collection}`)}
          className="shrink-0 uppercase text-[#1a1410] cursor-pointer bg-transparent border-none tracking-[0.14em] hover:text-[#C2583A] transition-colors duration-200"
          style={{ fontFamily: 'Cairo, sans-serif', fontSize: '12px', fontWeight: 600 }}
        >
          See All
        </button>
      </div>

      {/* Desktop — 3 cards in a row */}
      <div className="hidden lg:flex flex-row gap-6">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-1 min-w-0">
              <ProductCardSkeleton />
            </div>
          ))
          : products.slice(0, 3).map((product) => (
            <div key={product.id} className="flex-1 min-w-0">
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
