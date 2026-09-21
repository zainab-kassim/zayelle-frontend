"use client";

import Link from "next/link";
import SizeSelector from "../../ui/SizeSelector";
import QuantitySelector from "../../ui/QuantitySelector";
import { Product } from "@/types/product";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";
import { slugifyCollectionName } from "@/lib/slugify";
import Loader from "@/components/ui/Loader";

interface ProductInfoProps {
  product: Product;
  selectedSize: string;
  quantity: number;
  onSizeChange: (size: string) => void;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
  isAddingToCart: boolean;
}

export default function ProductInfo({
  product, selectedSize, quantity, onSizeChange, onIncrease, onDecrease, onAddToCart, isAddingToCart,
}: ProductInfoProps) {
  const { currency } = useCurrencyStore();

  return (
    <div className="flex flex-col gap-4 sm:gap-6 w-full">

      <div className="flex flex-col gap-2">
        {/* Collection */}
        {product.collections?.name && (
          <Link
            href={`/products?collection=${slugifyCollectionName(product.collections.name)}`}
            className="font-sans text-muted font-normal uppercase tracking-[0.14em] text-[10px] sm:text-[11px] w-fit hover:text-ink transition-colors duration-200"
          >
            {product.collections.name}
          </Link>
        )}

        {/* Name */}
        <h1 className="font-serif text-ink/85 font-normal leading-[1.15] text-[20px] sm:text-[28px] md:text-[32px]">
          {product.name}
        </h1>

        {/* Price */}
        <p className="font-sans text-muted text-[15px] sm:text-[16px] mt-0.5">
          {formatPrice(product.price, currency)}
        </p>

        {/* Pre-order notice */}
        <p className="font-sans text-red-600 text-[12px] sm:text-[13px] leading-relaxed mt-1">
          Pre-Order: all orders ship October 12.
        </p>

        {/* Shipping estimate */}
        <div className="flex items-center gap-2 mt-0.5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-muted flex-shrink-0"
            aria-hidden="true"
          >
            <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
            <path d="M13 10h4l4 4v2h-8" />
            <circle cx="7.5" cy="18.5" r="1.5" />
            <circle cx="17.5" cy="18.5" r="1.5" />
          </svg>
          <span className="font-sans text-muted text-[12px] sm:text-[13px]">
            Shipping takes 7–14 days
          </span>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <p className="font-sans text-muted text-[12px] sm:text-[14px] leading-relaxed max-w-md border-t border-line pt-4 sm:pt-6">
          {product.description}
        </p>
      )}

      {/* Size selector */}
      <SizeSelector
        sizes={product.size}
        selectedSize={selectedSize}
        onSizeChange={onSizeChange}
      />

      {/* Quantity */}
      <QuantitySelector
        quantity={quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      {/* Add to cart */}
      <button
        onClick={onAddToCart}
        disabled={isAddingToCart || !selectedSize}
        className="w-full h-12 bg-ink text-paper font-sans font-normal uppercase tracking-[0.1em] text-[12px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isAddingToCart ? <Loader /> : "Add to Cart"}
      </button>
    </div>
  );
}
