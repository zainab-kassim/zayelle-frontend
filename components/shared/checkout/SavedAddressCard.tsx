// components/checkout/SavedAddressCard.tsx
"use client";

import { Address } from "@/store/checkoutStore";
import Image from "next/image";

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
    <div className="flex flex-col gap-4 w-full">
      {/* Header */}
      <div className="flex items-center flex-row gap-3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mt-0.5 flex-shrink-0">
          <path d="M10 2C7.24 2 5 4.24 5 7C5 10.75 10 17 10 17C10 17 15 10.75 15 7C15 4.24 12.76 2 10 2ZM10 8.5C9.17 8.5 8.5 7.83 8.5 7C8.5 6.17 9.17 5.5 10 5.5C10.83 5.5 11.5 6.17 11.5 7C11.5 7.83 10.83 8.5 10 8.5Z"
            fill="#1a1a1a" />
        </svg>
        <h3 className="text-[15px] font-semibold text-[#1a1a1a]">
          Saved Address
        </h3>
      </div>

      {/* Address card — highlighted when selected */}
      <div
        className={`rounded-xl p-4 flex flex-col gap-3 border-[0.5px] transition-all duration-300 ${isSelected
            ? "border-[#9e9898] bg-[#f5f5f5]"
            : "border-transparent bg-[#F8F8F8]"
          }`}
      >
        <div className="flex flex-col gap-1">
          <p className="text-[13px] font-semibold text-[#1a1a1a]">
            {address.firstName} {address.lastName}
          </p>
          <p className="text-[12px] text-[#5a5a5a]" >
            {address.street}{address.apt ? `, ${address.apt}` : ""}
          </p>
          <p className="text-[12px] text-[#5a5a5a]" >
            {address.city}, {address.province} {address.postalCode}
          </p>
          <p className="text-[12px] text-[#5a5a5a]">
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

      {/* Use Address button — toggles to selected state */}
      <button
        onClick={onUseAddress}
        className={`w-full py-2.5 border-2 rounded-lg text-[12px] font-semibold
          tracking-[0.18em] uppercase transition-all duration-300 ${isSelected
            ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
            : "border-[#1a1a1a] text-white bg-[#1a1a1a]"
          }`}
      >
        {isSelected ? "Address Selected" : "Use Address"}
      </button>

      {/* Info box */}
      <div className="rounded-xl p-4 flex items-start gap-3" style={{ background: "#EEF2FF" }}>
        <Image src='https://img.icons8.com/?size=100&id=59730&format=png&color=4338CA' width={20} height={20} alt="info" />
        <div>
          <p className="text-[12px] font-semibold text-[#4338CA]">
            Why do we need this?
          </p>
          <p className="text-[12px] text-[#6366F1] mt-0.5"
          >
            We use this information to deliver your order accurately and keep you updated.
          </p>
        </div>
      </div>

    </div>
  );
}