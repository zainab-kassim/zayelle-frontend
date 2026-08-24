import { formatPrice } from "@/lib/currency";

// flat shipping fee shown for display only — same hardcoded value used in
// ReviewOrder.tsx at checkout. It's already folded into `total` from order
// creation, so it must NOT be added again here.
const SHIPPING_FEE = 500;

interface OrderSummaryCardProps {
  subtotal: number;
  total: number;
  currency: string;
}

export default function OrderSummaryCard({ subtotal, total, currency }: OrderSummaryCardProps) {
  return (
    <div className="h-full rounded-2xl p-5 border border-[#f0f0f0]" style={{ background: "#F8F8F8" }}>
      <p
        className="text-[11px] sm:text-[13px] font-medium tracking-[0.2em] uppercase text-[#1a1a1a] mb-4"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        Order Summary
      </p>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <span
            className="text-[13px] sm:text-[15px] text-[#5a5a5a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            Subtotal
          </span>
          <span
            className="text-[13px] sm:text-[15px] text-[#1a1a1a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {formatPrice(subtotal, currency)}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-[#e8e8e8]">
          <span
            className="text-[13px] sm:text-[15px] text-[#5a5a5a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            Shipping
          </span>
          <span
            className="text-[13px] sm:text-[15px] text-[#1a1a1a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {formatPrice(SHIPPING_FEE, currency)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span
            className="text-[13px] sm:text-[15px] font-medium text-[#1a1a1a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            Total Amount
          </span>
          <span
            className="text-[14px] sm:text-[16px] font-semibold text-[#1a1a1a]"
            style={{ fontFamily: "Cairo, sans-serif" }}
          >
            {formatPrice(total, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
