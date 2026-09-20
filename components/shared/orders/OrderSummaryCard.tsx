import { formatPrice } from "@/lib/currency";

interface OrderSummaryCardProps {
  subtotal: number;
  total: number;
  currency: string;
  // omit when the estimate is already shown elsewhere on the page (e.g.
  // OrderHeaderStats) — avoids showing the same date twice
  estimatedDate?: string;
  // pending orders have no order_items yet, so subtotal/shipping can't be
  // broken out — show only the real charged total rather than a breakdown
  // that wouldn't add up
  hasItems?: boolean;
}

export default function OrderSummaryCard({
  subtotal,
  total,
  currency,
  estimatedDate,
  hasItems = true,
}: OrderSummaryCardProps) {
  // derived, never hardcoded — a fixed shipping figure will drift from
  // whatever was actually charged and stop reconciling with the total
  const shipping = Math.max(0, total - subtotal);

  return (
    <div className="rounded-2xl p-6 bg-surface">
      <p className="font-sans text-muted font-normal uppercase tracking-[0.12em] text-[11px] mb-5">
        Order Summary
      </p>

      {hasItems && (
        <>
          <div className="flex justify-between items-center mb-3.5">
            <p className="font-sans text-muted text-[13px]">Subtotal</p>
            <p className="font-sans text-ink/65 font-normal text-[14px]">{formatPrice(subtotal, currency)}</p>
          </div>

          <div className="flex justify-between items-center mb-3.5">
            <p className="font-sans text-muted text-[13px]">Shipping</p>
            <p className="font-sans text-ink/65 font-normal text-[14px]">
              {shipping > 0 ? formatPrice(shipping, currency) : "Free"}
            </p>
          </div>
        </>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-line">
        <p className="font-sans text-ink/65 font-normal text-[13px]">Total</p>
        <p className="font-sans text-ink/85 font-normal text-[16px]">{formatPrice(total, currency)}</p>
      </div>

      {estimatedDate && (
        <div className="flex justify-between items-center mt-5 pt-4 border-t border-line">
          <p className="font-sans text-muted uppercase tracking-[0.08em] text-[11px]">Estimated Delivery</p>
          <p className="font-sans text-ink/65 font-normal text-[13px]">{estimatedDate}</p>
        </div>
      )}
    </div>
  );
}
