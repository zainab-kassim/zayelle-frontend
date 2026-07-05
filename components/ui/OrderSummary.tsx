"use client";

interface OrderSummaryProps {
  subtotal: number;
  onCheckout: () => void;
}

export default function OrderSummary({ subtotal, onCheckout }: OrderSummaryProps) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-4"
      style={{ background: "#F2F2F2" }}
    >
      {/* Title */}
      <h2
        className="text-[13px] font-bold uppercase text-[#1a1a1a]"
 
      >
        Order Summary
      </h2>

      {/* Subtotal */}
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span
            className="text-[16px] text-[#1a1a1a]"
          
          >
            Subtotal
          </span>
        </div>
        <span
          className="text-[16px] font-semibold text-[#1a1a1a]"
        >
          ${subtotal}
        </span>
      </div>

      {/* Shipping */}
      <p
        className="text-[11px] text-[#8a8a8a] tracking-wide"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        Shipping Will Be Calculated At Checkout
      </p>

      {/* Checkout button */}
      <button
        onClick={onCheckout}
        className="
          w-full py-3.5 bg-[#1a1a1a] text-white
          text-[11px] font-semibold tracking-[0.22em] uppercase
          rounded-md transition-all duration-300
          hover:bg-[#333]
        "
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        Confirm Order
      </button>
    </div>
  );
}