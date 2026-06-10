// components/ProductListing/SidebarFilters.tsx
"use client";

interface SidebarFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FILTERS = [
  "ALL",
  "FLOREAL COLLECTION",
  "ZAYELLE LUXE WEAVE",
  "NEW ARRIVALS",
];

export default function SidebarFilters({
  activeFilter,
  onFilterChange,
}: SidebarFiltersProps) {
  return (
    <aside className="hidden lg:flex flex-col flex-shrink-0 pr-4">
      {FILTERS.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <div key={filter} className="flex flex-col">
            <button
              onClick={() => onFilterChange(filter)}
              className={`
                text-left text-[16px] tracking-[0.12em] uppercase py-8 transition-all  duration-200
                ${isActive
                  ? "font-bold text-[#1a1a1a]"
                  : "font-normal text-[#747474] hover:text-[#1a1a1a]"
                }
              `} style={{ fontFamily: '"Expletus Sans", serif' }}
            >
              {filter}
            </button>
            {/* Full width divider under each item */}
            <span className={`block  w-full h-px rounded-t-3xl bg-[#d7d7d7]`}/>
          </div>
        );
      })}
    </aside>
  );
}