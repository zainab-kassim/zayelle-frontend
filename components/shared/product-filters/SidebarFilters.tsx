"use client";

import FilterPanelContent, { FilterPanelContentProps, hasActiveFilters } from "./FilterPanelContent";
import FilterIcon from "./FilterIcon";

interface SidebarFiltersProps extends FilterPanelContentProps {
  onReset: () => void;
}

// desktop-only filter panel; MobileFilterDrawer is the mobile equivalent
export default function SidebarFilters(props: SidebarFiltersProps) {
  const { activeFilter, sortBy, selectedSizes, onReset } = props;

  return (
    <aside className="hidden lg:block flex-shrink-0 w-[240px]">
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-2 font-sans text-ink font-medium uppercase tracking-[0.14em] text-[12px]">
          <FilterIcon />
          Filter &amp; Sort
        </span>
        {hasActiveFilters(activeFilter, sortBy, selectedSizes) && (
          <button
            onClick={onReset}
            className="font-sans text-muted font-medium uppercase tracking-[0.1em] text-[11px] border-b border-ink/40 hover:border-ink hover:text-ink transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      <FilterPanelContent {...props} />
    </aside>
  );
}
