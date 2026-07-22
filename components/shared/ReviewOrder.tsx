// components/checkout/ReviewOrder.tsx
"use client";

import Image from "next/image";
import { CartItem } from "@/types/cart";
import { Address } from "@/store/checkoutStore";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReviewOrderProps {
  items: CartItem[];
  address: Address;
  subtotal: number;
  shippingFee: number;
  total: number;
  onConfirmOrder: () => void;
  isLoading?: boolean;
}

// ─── Item row ─────────────────────────────────────────────────────────────────
function ReviewItem({ item }: { item: CartItem }) {
  const product = item.product;
  return (
    <div className="flex flex-row items-center gap-4 py-4 border-b border-[#f0f0f0] last:border-0">
      {/* Image */}
      <div
        className="flex-shrink-0 w-[90px] h-[100px] sm:w-[110px] sm:h-[120px] rounded-xl flex items-center justify-center overflow-hidden"
        style={{ background: "#F8F8F8" }}
      >
        {product.image![0] && (
          <Image
            src={product.image! [0]}
            alt={product.name}
            width={90}
            height={100}
            className="object-contain w-[80%] h-[80%]"
          />
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1">
        <p
          className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wide text-[#1a1a1a]"
          style={{ fontFamily: '"Expletus Sans", serif' }}
        >
          {product.name}
        </p>
        <p
          className="text-[11px] text-[#8a8a8a] uppercase tracking-widest"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          {item.size} / {product.name.split(" ").pop()}
        </p>
        <p
          className="text-[12px] text-[#5a5a5a] mt-1"
          style={{ fontFamily: "Cairo, sans-serif" }}
        >
          QTY: {item.quantity}
        </p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function ReviewOrder({
  items,
  address,
  subtotal,
  shippingFee,
  total,
  onConfirmOrder,
  isLoading = false,
}: ReviewOrderProps) {

  const formattedAddress = [
    [address.street, address.apt].filter(Boolean).join(", "),
    [address.city, address.province].filter(Boolean).join(", "),
    address.country,
    address.postalCode,
  ].filter(Boolean);

  return (
    <div className="w-full flex flex-col gap-4">

      {/* Section title */}
      <p
        className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#1a1a1a]"
        style={{ fontFamily: '"Expletus Sans", serif' }}
      >
        Your Items
      </p>

      {/* Desktop: side-by-side | Mobile: stacked */}
      <div className="flex flex-col lg:flex-row gap-4 items-start">

        {/* ── Left column ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-4 flex-1 w-full">

          {/* Items card */}
          <div
            className="rounded-2xl p-5 border border-[#f0f0f0]"
            style={{ background: "#F8F8F8" }}
          >
            {items.map((item) => (
              <ReviewItem key={item.id} item={item} />
            ))}
          </div>

          {/* Delivery address card */}
          <div
            className="rounded-2xl p-5 border border-[#f0f0f0]"
            style={{ background: "#F8F8F8" }}
          >
            {/* Delivery address */}
            <div className="flex flex-col gap-1 pb-4 border-b border-[#e8e8e8]">
              <p
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a] mb-2"
                style={{ fontFamily: '"Expletus Sans", serif' }}
              >
                Delivery Address
              </p>
              {formattedAddress.map((line, i) => (
                <p
                  key={i}
                  className="text-[12px] uppercase text-[#5a5a5a]"
                  style={{ fontFamily: "Cairo, sans-serif" }}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-1 pt-4">
              <p
                className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a] mb-2"
                style={{ fontFamily: '"Expletus Sans", serif' }}
              >
                Contact
              </p>
              <p
                className="text-[12px] text-[#5a5a5a]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {address.phone}
              </p>
              <p
                className="text-[12px] text-[#5a5a5a]"
                style={{ fontFamily: "Cairo, sans-serif" }}
              >
                {address.email}
              </p>
            </div>
          </div>

        </div>

        {/* ── Right column — Order summary ─────────────────────────── */}
        <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0">
          <div
            className="rounded-2xl p-5 border border-[#f0f0f0]"
            style={{ background: "#F8F8F8" }}
          >
            <p
              className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#1a1a1a] mb-5"
              style={{ fontFamily: '"Expletus Sans", serif' }}
            >
              Order Summary
            </p>

            {/* Subtotal */}
            <div className="flex justify-between items-center mb-3">
              <p className="text-[13px] text-[#1a1a1a]"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                Subtotal
              </p>
              <p className="text-[13px] text-[#1a1a1a]"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                ${subtotal.toFixed(2)}
              </p>
            </div>

            {/* Shipping */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-[#e8e8e8]">
              <p className="text-[13px] text-[#1a1a1a]"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                Shipping Fee
              </p>
              <p className="text-[13px] text-[#1a1a1a]"
                style={{ fontFamily: "Cairo, sans-serif" }}>
                ${shippingFee.toFixed(2)}
              </p>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-5">
              <p className="text-[14px] text-[#1a1a1a]"
                style={{ fontFamily: '"Expletus Sans", serif' }}>
                Total
              </p>
              <p className="text-[15px] font-bold text-[#1a1a1a]"
                style={{ fontFamily: '"Expletus Sans", serif' }}>
                ${total.toFixed(2)}
              </p>
            </div>

            {/* Confirm button */}
            <button
              onClick={onConfirmOrder}
              disabled={isLoading}
              className="w-full py-3.5 bg-[#1a1a1a] text-white text-[12px]
                font-semibold tracking-[0.22em] uppercase rounded-md
                hover:bg-[#333] transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Cairo, sans-serif" }}
            >
              {isLoading ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}