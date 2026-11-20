"use client";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string;
  onSizeChange: (size: string) => void;
  disabled?: boolean;
}

export default function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
  disabled = false,
}: SizeSelectorProps) {
  if (!sizes || sizes.length === 0) return null;
  return (
    <div className="flex flex-col gap-3">
      <p className="font-sans text-muted font-normal uppercase tracking-[0.14em] text-[10px] sm:text-[11px]">
        Size
      </p>
      <div className="flex flex-row flex-wrap gap-2">
        {sizes.map((size) => {
          const isActive = selectedSize === size;
          return (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              disabled={disabled}
              aria-pressed={isActive}
              className={`min-w-12 h-12 px-3 font-sans text-[12px] font-normal tracking-wide border transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                isActive
                  ? "bg-ink text-paper border-ink"
                  : "bg-paper text-ink border-line hover:border-ink/50"
              }`}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}
