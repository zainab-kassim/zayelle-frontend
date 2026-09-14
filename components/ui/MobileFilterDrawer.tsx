"use client";

import { useEffect } from "react";
import FilterPanelContent, { FilterPanelContentProps } from "@/components/ui/FilterPanelContent";
import FilterIcon from "@/components/ui/FilterIcon";

interface MobileFilterDrawerProps extends FilterPanelContentProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
  resultCount: number;
}

// Slide-up sheet holding the same Collection/Sort/Size content as the
// desktop sidebar — the standard mobile-ecommerce pattern for a filter
// panel that doesn't fit as a persistent column at phone width.
export default function MobileFilterDrawer(props: MobileFilterDrawerProps) {
  const { isOpen, onClose, onReset, resultCount } = props;

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden="true" />

      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] flex flex-col bg-paper rounded-t-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-line flex-shrink-0">
          <span className="flex items-center gap-2 font-sans text-ink font-medium uppercase tracking-[0.14em] text-[12px]">
            <FilterIcon />
            Filter &amp; Sort
          </span>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="text-muted hover:text-ink transition-colors duration-200"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <FilterPanelContent {...props} />
        </div>

        <div className="flex items-center gap-3 px-6 py-4 border-t border-line flex-shrink-0">
          <button
            onClick={onReset}
            className="font-sans text-muted font-medium uppercase tracking-[0.1em] text-[11px] border-b border-ink/40 hover:border-ink hover:text-ink transition-colors duration-200"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-ink text-paper rounded-full py-3.5 font-sans font-medium uppercase tracking-[0.1em] text-[12px] transition-opacity duration-200 hover:opacity-90"
          >
            Show {resultCount} {resultCount === 1 ? "Result" : "Results"}
          </button>
        </div>
      </div>
    </div>
  );
}
