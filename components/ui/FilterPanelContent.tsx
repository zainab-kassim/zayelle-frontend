"use client";

import { useState } from "react";

export type SortOption = "featured" | "price-asc" | "price-desc";

export interface FilterPanelContentProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  availableSizes: string[];
  selectedSizes: string[];
  onSizeToggle: (size: string) => void;
}

export const COLLECTION_FILTERS = [
  "ALL",
  "FLOREAL COLLECTION",
  "ZAYELLE LUXE WEAVE",
  "NEW ARRIVALS",
];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function hasActiveFilters(activeFilter: string, sortBy: SortOption, selectedSizes: string[]): boolean {
  return activeFilter !== "ALL" || sortBy !== "featured" || selectedSizes.length > 0;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

// Collapsible section — the Shopify collection-template pattern (Product
// Type / Size / Fit as accordion rows under one Filter & Sort panel), rather
// than every facet permanently expanded.
function AccordionSection({ title, defaultOpen = false, noBorder = false, children }: { title: string; defaultOpen?: boolean; noBorder?: boolean; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`py-3 ${noBorder ? "" : "border-b border-line"}`}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="font-sans text-ink font-medium uppercase tracking-[0.12em] text-[12px]">{title}</span>
        <ChevronIcon open={isOpen} />
      </button>
      {isOpen && <div className="pt-4">{children}</div>}
    </div>
  );
}

function RadioRow({ isActive, label, onClick }: { isActive: boolean; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between gap-3 text-left">
      <span className={`font-sans text-[13px] font-normal transition-colors duration-200 ${isActive ? "text-ink" : "text-muted"}`}>
        {label}
      </span>
      <span
        className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
          isActive ? "border-ink" : "border-line"
        }`}
      >
        {isActive && <span className="w-3 h-3 rounded-full bg-ink" />}
      </span>
    </button>
  );
}

// Shared Sort / Collection / Size accordion, rendered inside the desktop
// sidebar and the mobile filter drawer alike — one source of truth for the
// actual filtering controls, just two different shells around it.
export default function FilterPanelContent({
  activeFilter,
  onFilterChange,
  sortBy,
  onSortChange,
  availableSizes,
  selectedSizes,
  onSizeToggle,
}: FilterPanelContentProps) {
  return (
    <div>
      {/* Sort By and Collection open expanded by default; Size stays
          collapsed until someone actually wants it. */}
      <AccordionSection title="Sort By" defaultOpen>
        <div className="flex flex-col gap-2.5">
          {SORT_OPTIONS.map(({ value, label }) => (
            <RadioRow
              key={value}
              label={label}
              isActive={sortBy === value}
              onClick={() => onSortChange(value)}
            />
          ))}
        </div>
      </AccordionSection>

      <AccordionSection title="Collection" defaultOpen>
        <div className="flex flex-col gap-2.5">
          {COLLECTION_FILTERS.map((filter) => (
            <RadioRow
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => onFilterChange(filter)}
            />
          ))}
        </div>
      </AccordionSection>

      {/* Size — bordered selectable boxes, the standard ecommerce size-grid
          pattern, built from each product's own size list rather than a
          fixed/fake set. */}
      {availableSizes.length > 0 && (
        <AccordionSection title="Size" defaultOpen noBorder>
          <div className="flex flex-wrap gap-2">
            {availableSizes.map((size) => {
              const isActive = selectedSizes.includes(size);
              return (
                <button
                  key={size}
                  onClick={() => onSizeToggle(size)}
                  className={`min-w-[40px] px-2 py-2 text-center border font-sans text-[13px] transition-colors duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-ink hover:border-ink"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </AccordionSection>
      )}
    </div>
  );
}
