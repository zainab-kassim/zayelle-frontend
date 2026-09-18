"use client";

interface CartQuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function CartQuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
}: CartQuantitySelectorProps) {
  return (
    <div className="flex flex-row items-center border border-line h-9 w-fit flex-shrink-0">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="w-8 h-full flex items-center justify-center text-[14px] text-ink hover:bg-surface transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span className="w-8 h-full flex items-center justify-center font-sans text-[12px] font-normal text-ink border-x border-line">
        {quantity}
      </span>
      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="w-8 h-full flex items-center justify-center text-[14px] text-ink hover:bg-surface transition-colors duration-200"
      >
        +
      </button>
    </div>
  );
}
