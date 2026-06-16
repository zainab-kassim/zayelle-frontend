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
      <p
        className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a1a1a]"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        Quantity
      </p>
      <div className="flex flex-row items-center gap-0 border border-[#d0d0d0] rounded-md w-fit">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center text-[18px] text-[#1a1a1a]
            hover:bg-[#f5f5f5] transition-colors duration-200 disabled:opacity-30
            disabled:cursor-not-allowed rounded-l-md"
        >
          −
        </button>
        <span
          className="w-10 h-10 flex items-center justify-center text-[14px] font-medium
            text-[#1a1a1a] border-x border-[#d0d0d0]"
        >
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="w-10 h-10 flex items-center justify-center text-[18px] text-[#1a1a1a]
            hover:bg-[#f5f5f5] transition-colors duration-200 rounded-r-md"
        >
          +
        </button>
      </div>
    </div>
  );
}