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
  mobileImageHeightClassName?: string;
  mobileImageWrapperClassName?: string;
  desktopImageHeightClassName?: string;
  desktopImageWrapperClassName?: string;
}

export default function FloralCollection({ collection, eyebrow, title, mobileImageHeightClassName, mobileImageWrapperClassName, desktopImageHeightClassName, desktopImageWrapperClassName }: FloralCollectionProps) {
  const router = useRouter();
  const { currency } = useCurrencyStore();

  // currency changes → re-fetches → interceptor sends new header → backend returns new prices
  const { data: products, isLoading } = useAsyncData(
    () => getProductByCollection(collection).then((res) => res.products),
    [currency, collection],
    [] as Product[]
  );

  return (
    <section className="w-full">

      {/* Section Header */}
      <div className="flex items-end justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <span className="font-sans block text-muted font-medium uppercase tracking-[0.2em] text-[10px] sm:text-[11px] mb-2">
            {eyebrow}
          </span>
          <h2 className="font-serif text-ink font-normal tracking-normal leading-[1.18] text-[18px] sm:text-[25px] md:text-[28px]">
            {title}
          </h2>
        </div>

        <button
          onClick={() => router.push(`/products?collection=${collection}`)}
          className="font-sans shrink-0 uppercase text-ink cursor-pointer bg-transparent border-b border-ink/40 pb-0.5 tracking-[0.1em] text-[10px] sm:text-[11px] font-medium hover:border-ink transition-colors duration-200"
        >
          View All
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
                {...(desktopImageHeightClassName ? { imageHeightClassName: desktopImageHeightClassName } : {})}
                {...(desktopImageWrapperClassName ? { imageWrapperClassName: desktopImageWrapperClassName } : {})}
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
                {...(mobileImageHeightClassName ? { imageHeightClassName: mobileImageHeightClassName } : {})}
                {...(mobileImageWrapperClassName ? { imageWrapperClassName: mobileImageWrapperClassName } : {})}
              />
            </div>
          ))}
      </div>

    </section>
  );
}
