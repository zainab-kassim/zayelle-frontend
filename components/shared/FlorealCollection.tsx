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
  // excludes the current product from "You Might Also Like"
  excludeSlug?: string;
  // fixed-width scrollable row instead of stretched columns (used on PDP)
  fixedWidth?: boolean;
  // hides quick-add (PDP already has its own size/quantity/Add to Cart)
  showQuickAdd?: boolean;
}

export default function FloralCollection({ collection, eyebrow, title, mobileImageHeightClassName, mobileImageWrapperClassName, desktopImageHeightClassName, desktopImageWrapperClassName, excludeSlug, fixedWidth, showQuickAdd = true }: FloralCollectionProps) {
  const router = useRouter();
  const { currency } = useCurrencyStore();

  // currency changes → re-fetches → interceptor sends new header → backend returns new prices
  const { data: allProducts, isLoading } = useAsyncData(
    () => getProductByCollection(collection).then((res) => res.products),
    [currency, collection],
    [] as Product[]
  );

  const products = excludeSlug
    ? allProducts.filter((p) => p.slug !== excludeSlug)
    : allProducts;

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="w-full">

      {/* Section Header */}
      <div className="flex items-end justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <span
            className={`font-sans block text-muted uppercase mb-2 ${
              fixedWidth
                ? "font-normal tracking-[0.14em] text-[9px] sm:text-[11px]"
                : "font-medium tracking-[0.2em] text-[10px] sm:text-[11px]"
            }`}
          >
            {eyebrow}
          </span>
          <h2
            className={
              fixedWidth
                // smaller on PDP so it doesn't outweigh the product title above it
                ? "font-serif text-ink/80 font-normal tracking-normal leading-[1.18] text-[14px] sm:text-[20px] md:text-[22px]"
                : "font-serif text-ink font-normal tracking-normal leading-[1.18] text-[18px] sm:text-[25px] md:text-[28px]"
            }
          >
            {title}
          </h2>
        </div>

        <button
          onClick={() => router.push(`/products?collection=${collection}`)}
          className={`font-sans shrink-0 uppercase text-ink cursor-pointer bg-transparent border-b border-ink/40 pb-0.5 font-medium hover:border-ink transition-colors duration-200 ${
            fixedWidth ? "tracking-[0.08em] text-[9px] sm:text-[11px]" : "tracking-[0.1em] text-[10px] sm:text-[11px]"
          }`}
        >
          View All
        </button>
      </div>

      {fixedWidth ? (
        /* fixed-width row, scrolls horizontally instead of stretching */
        <div
          className="flex flex-row gap-5 no-scrollbar"
          style={{
            overflowX: 'auto',
            scrollbarWidth: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[50vw] sm:w-[240px] md:w-[260px]">
                <ProductCardSkeleton />
              </div>
            ))
            : products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[50vw] sm:w-[240px] md:w-[260px]">
                <ProductCard
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                  showQuickAdd={showQuickAdd}
                  {...(mobileImageHeightClassName ? { imageHeightClassName: mobileImageHeightClassName } : {})}
                  {...(mobileImageWrapperClassName ? { imageWrapperClassName: mobileImageWrapperClassName } : {})}
                />
              </div>
            ))}
        </div>
      ) : (
        <>
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
        </>
      )}

    </section>
  );
}
