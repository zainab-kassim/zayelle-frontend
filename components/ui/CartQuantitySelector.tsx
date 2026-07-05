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
    <div className="flex flex-col gap-3">
      <div className="flex flex-row items-center gap-0 border border-[#d0d0d0] rounded-md w-fit">
        <button
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="md:w-10 w-8 md:h-8 h-6 flex items-center justify-center text-[14px] md:text-[16px] text-[#1a1a1a]
            hover:bg-[#f5f5f5] transition-colors duration-200 disabled:opacity-30
            disabled:cursor-not-allowed rounded-l-md"
        >
          −
        </button>
        <span
          className="md:w-10 w-8 md:h-8 h-6 flex items-center justify-center text-[14px] md:text-[16px] font-medium
            text-[#1a1a1a] border-x border-[#d0d0d0]"
        >
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="md:w-10 w-8 md:h-8 h-6 flex items-center justify-center text-[14px] md:text-[16px] text-[#1a1a1a]
            hover:bg-[#f5f5f5] transition-colors duration-200 rounded-r-md"
        >
          +
        </button>
      </div>
    </div>
  );
}