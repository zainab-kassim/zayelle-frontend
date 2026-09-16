// components/product/QuantitySelector.tsx
"use client";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-muted font-normal uppercase tracking-[0.14em] text-[10px] sm:text-[11px]">
        Quantity
      </p>
      <div className="flex flex-row items-center border border-line h-12 w-fit flex-shrink-0">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          aria-label="Decrease quantity"
          className="w-11 h-full flex items-center justify-center text-[16px] text-ink hover:bg-surface transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="w-9 h-full flex items-center justify-center font-sans text-[12px] font-normal text-ink border-x border-line">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          aria-label="Increase quantity"
          className="w-11 h-full flex items-center justify-center text-[16px] text-ink hover:bg-surface transition-colors duration-200"
        >
          +
        </button>
      </div>
    </div>
  );
}
