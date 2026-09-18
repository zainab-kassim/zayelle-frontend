"use client";

import { Address } from "@/store/checkoutStore";

interface SavedAddressCardProps {
  address: Address | null;
  isSelected: boolean;
  onUseAddress: () => void;
}

export default function SavedAddressCard({
  address, isSelected, onUseAddress,
}: SavedAddressCardProps) {
  if (!address) return null;

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Header */}
      <div className="flex items-center flex-row gap-2">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 text-ink" aria-hidden="true">
          <path d="M10 2C7.24 2 5 4.24 5 7C5 10.75 10 17 10 17C10 17 15 10.75 15 7C15 4.24 12.76 2 10 2ZM10 8.5C9.17 8.5 8.5 7.83 8.5 7C8.5 6.17 9.17 5.5 10 5.5C10.83 5.5 11.5 6.17 11.5 7C11.5 7.83 10.83 8.5 10 8.5Z"
            fill="currentColor" />
        </svg>
        <h3 className="font-sans text-ink font-medium uppercase tracking-[0.08em] text-[11px]">
          Saved Address
        </h3>
      </div>

      {/* Address card — highlighted when selected */}
      <div
        className={`rounded-xl p-3.5 flex flex-col gap-2.5 border-[0.5px] transition-colors duration-200 ${
          isSelected ? "border-ink bg-surface" : "border-line bg-surface"
        }`}
      >
        <div className="flex flex-col gap-0.5">
          <p className="font-sans text-ink font-medium text-[12px]">
            {address.customerName}
          </p>
          <p className="font-sans text-muted text-[11px]">
            {address.street}{address.apt ? `, ${address.apt}` : ""}
          </p>
          <p className="font-sans text-muted text-[11px]">
            {address.city}, {address.province} {address.postalCode}
          </p>
          <p className="font-sans text-muted text-[11px]">
            {address.country}
          </p>
        </div>

        <div className="h-px bg-line" />

        <div className="flex flex-col gap-0.5">
          <p className="font-sans text-muted text-[11px]">
            Phone: {address.phone}
          </p>
          <p className="font-sans text-muted text-[11px]">
            Email: {address.email}
          </p>
        </div>
      </div>

      {/* Use Address button — toggles to selected state */}
      <button
        onClick={onUseAddress}
        className={`w-full h-11 font-sans font-normal uppercase tracking-[0.08em] text-[10.5px] transition-all duration-200 ${
          isSelected
            ? "bg-ink text-paper"
            : "border border-ink text-ink hover:bg-ink hover:text-paper"
        }`}
      >
        {isSelected ? "Address Selected" : "Use Address"}
      </button>

      {/* Info note */}
      <div className="rounded-xl p-3.5 flex items-start gap-2.5 bg-surface border border-line">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted flex-shrink-0 mt-0.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 16v-5M12 8h.01" />
        </svg>
        <div>
          <p className="font-sans text-ink font-medium text-[11px]">
            Why do we need this?
          </p>
          <p className="font-sans text-muted text-[11px] mt-0.5">
            We use this information to deliver your order accurately and keep you updated.
          </p>
        </div>
      </div>

    </div>
  );
}
