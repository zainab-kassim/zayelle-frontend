// components/product/SizeSelector.tsx
"use client";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
}: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;
  return (
    
    <div className="flex flex-col gap-3">
      <p
        className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#1a1a1a]"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        Select Size
      </p>
      <div className="flex flex-row gap-2">
        {sizes.map((size) => {
          const isActive = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`
                w-10 h-10 rounded-full text-[12px] font-medium tracking-wide
                border transition-all duration-200
                ${isActive
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-white text-[#1a1a1a] border-[#d0d0d0] hover:border-[#1a1a1a]"
                }
              `}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}