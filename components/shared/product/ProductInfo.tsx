"use client";

import SizeSelector from "../../ui/SizeSelector";
import QuantitySelector from "../../ui/QuantitySelector";
import { Product } from "@/types/product";

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
  product,
  selectedSize,
  quantity,
  onSizeChange,
  onIncrease,
  onDecrease,
  onAddToCart,
  isAddingToCart,
}: ProductInfoProps) {
  return (
    <div className="flex flex-col gap-6 w-full">

      {/* Collection + year */}
      <p
        className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5a5a5a]"
        style={{ fontFamily: '"Expletus Sans", serif' }}
      >
        {product.collections?.name?.toUpperCase()} • 2026
      </p>

      {/* Price */}
      <p
        className="md:text-[25px] lg:text-[38px] text-3xl font-bold text-[#1a1a1a] leading-none"
        style={{ fontFamily: '"Expletus Sans", serif' }}
      >
        ${product.price}
      </p>

      {/* Description */}
      <p
        className="text-[15px] leading-relaxed text-[#4a4a4a] max-w-md"
      >
        {product.description}
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque molestiae incidunt ab excepturi.
         Ad ipsa aliquam soluta consequ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga 
      </p>

      {/* Size selector */}
      <SizeSelector
        sizes={product.size}
        selectedSize={selectedSize}
        onSizeChange={onSizeChange}
      />

      {/* Quantity selector */}
      <QuantitySelector
        quantity={quantity}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />

      {/* Add to cart */}
      <button
        onClick={onAddToCart}
        disabled={isAddingToCart || !selectedSize}
        className="
          w-full py-4 bg-[#1a1a1a] text-white
          text-[12px] font-semibold tracking-[0.28em] mb-8 mt-6 md:mb-0 md:mt-0 xl:mt-10 uppercase
          rounded-md transition-all duration-300
          hover:bg-[#333] disabled:opacity-50 disabled:cursor-not-allowed
        "
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        {isAddingToCart ? "Adding..." : "Add to Cart"}
      </button>

    </div>
  );
}