// components/checkout/SavedAddressCard.tsx
"use client";

import { Address } from "@/store/checkoutStore";

interface SavedAddressCardProps {
  address: Address | null;
  onUseAddress: (address: Address) => void;
}

export default function SavedAddressCard({ address, onUseAddress }: SavedAddressCardProps) {
  if (!address) return null;

  return (
    <div className="flex flex-col gap-4 w-full">

      {/* Header */}
      <div className="flex items-start gap-3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 flex-shrink-0">
          <path d="M10 2C7.24 2 5 4.24 5 7C5 10.75 10 17 10 17C10 17 15 10.75 15 7C15 4.24 12.76 2 10 2ZM10 8.5C9.17 8.5 8.5 7.83 8.5 7C8.5 6.17 9.17 5.5 10 5.5C10.83 5.5 11.5 6.17 11.5 7C11.5 7.83 10.83 8.5 10 8.5Z"
            fill="#1a1a1a"/>
        </svg>
        <div>
          <h3 className="text-[15px] font-semibold text-[#1a1a1a]"
            style={{ fontFamily: '"Expletus Sans", serif' }}>
            Saved Address
          </h3>
          <p className="text-[12px] text-[#8a8a8a] mt-0.5"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            This is where your order will be shipped
          </p>
        </div>
      </div>

      {/* Address card */}
      <div className="rounded-xl p-4 flex flex-col gap-3" style={{ background: "#F8F8F8" }}>
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-semibold text-[#1a1a1a]"
            style={{ fontFamily: '"Expletus Sans", serif' }}>
            {address.firstName} {address.lastName}
          </p>
          <p className="text-[12px] text-[#5a5a5a]" style={{ fontFamily: "Cairo, sans-serif" }}>
            {address.street}{address.apt ? `, ${address.apt}` : ""}
          </p>
          <p className="text-[12px] text-[#5a5a5a]" style={{ fontFamily: "Cairo, sans-serif" }}>
            {address.city}, {address.province} {address.postalCode}
          </p>
          <p className="text-[12px] text-[#5a5a5a]" style={{ fontFamily: "Cairo, sans-serif" }}>
            {address.country}
          </p>
        </div>

        <div className="h-px bg-[#e8e8e8]" />

        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-[#5a5a5a]" style={{ fontFamily: "Cairo, sans-serif" }}>
            Phone: {address.phone}
          </p>
          <p className="text-[12px] text-[#5a5a5a]" style={{ fontFamily: "Cairo, sans-serif" }}>
            Email: {address.email}
          </p>
        </div>
      </div>

      {/* Use address button */}
      <button
        onClick={() => onUseAddress(address)}
        className="w-full py-2.5 border border-[#1a1a1a] rounded-lg text-[12px]
          font-semibold tracking-[0.18em] uppercase text-[#1a1a1a]
          hover:bg-[#1a1a1a] hover:text-white transition-all duration-300"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        Use Address
      </button>

      {/* Info box */}
      <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#EEF2FF" }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
          <rect width="20" height="20" rx="4" fill="#818CF8" fillOpacity="0.2"/>
          <path d="M10 6H10.01M9 10H10V14H11" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div>
          <p className="text-[12px] font-semibold text-[#4338CA]"
            style={{ fontFamily: '"Expletus Sans", serif' }}>
            Why do we need this?
          </p>
          <p className="text-[12px] text-[#6366F1] mt-0.5"
            style={{ fontFamily: "Cairo, sans-serif" }}>
            We use this information to deliver your order accurately and keep you updated.
          </p>
        </div>
      </div>

    </div>
  );
}