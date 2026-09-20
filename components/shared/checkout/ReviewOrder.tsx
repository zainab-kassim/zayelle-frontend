"use client";

import Image from "next/image";
import { CartItem } from "@/types/cart";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";
import Loader from "@/components/ui/Loader";

interface OrderDetails {
  id: number;
  street_address: string;
  totalLocal: number;
  apt_no: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  customerName: string;
  customerPhonenumber: string;
  user_id: {
    id: number;
    email: string;
  };
}

interface ReviewOrderProps {
  items: CartItem[];
  OrderDetails: OrderDetails;
  isPaying: boolean;
  onPayment: () => void;
  onEditAddress: () => void;
  isLoading?: boolean;
}

function ReviewItem({ item, currency }: { item: CartItem; currency: string }) {
  const product = item.product;
  return (
    <div className="flex flex-row items-center gap-4 py-4 border-b border-line last:border-0">
      <div className="flex-shrink-0 w-[76px] h-[86px] bg-surface rounded-lg flex items-center justify-center overflow-hidden">
        {product.image?.[0] && (
          <Image
            src={product.image[0]}
            alt={product.name}
            width={76}
            height={86}
            className="object-contain w-[75%] h-[75%]"
          />
        )}
      </div>

      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <p className="font-serif text-ink/80 text-[14px] leading-snug truncate">
          {product.name}
        </p>
        <p className="font-sans text-muted text-[12px]">
          Size {item.size} &middot; Qty {item.quantity}
        </p>
      </div>

      <p className="font-sans text-ink/80 text-[13px] flex-shrink-0">
        {formatPrice(item.unitprice * item.quantity, currency)}
      </p>
    </div>
  );
}

export default function ReviewOrder({
  items,
  OrderDetails,
  onPayment,
  onEditAddress,
  isPaying,
  isLoading = false,
}: ReviewOrderProps) {

  const formattedAddress = [
    [OrderDetails.street_address, OrderDetails.apt_no].filter(Boolean).join(", "),
    [OrderDetails.city, OrderDetails.state].filter(Boolean).join(", "),
    OrderDetails.country,
    OrderDetails.postal_code,
  ].filter(Boolean);
  const currency = useCurrencyStore((state) => state.currency);
  const paymentProvider = currency === "NGN" ? "Paystack" : "Stripe";
  // items are already priced in the selected currency (see cart service),
  // same as totalLocal — so this diff is exactly the shipping fee, without
  // needing the fee itself sent back from the order
  const subtotal = items.reduce((sum, item) => sum + item.unitprice * item.quantity, 0);
  const shipping = Math.max(0, OrderDetails.totalLocal - subtotal);

  return (
    <div className="w-full flex flex-col lg:flex-row gap-7 lg:gap-10 items-start">

      {/* ── Left column ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-7 flex-1 w-full">

        {/* Items — flat list, no card wrapper */}
        <div>
          <p className="font-sans text-muted font-normal uppercase tracking-[0.12em] text-[11px] mb-2">
            Order Items
          </p>
          {items.map((item) => (
            <ReviewItem key={item.id} item={item} currency={currency} />
          ))}
        </div>

        {/* Shipping To — address + contact merged into one compact card */}
        <div className="rounded-2xl p-5 border border-line bg-surface">
          <div className="flex items-center justify-between mb-3">
            <p className="font-sans text-muted font-normal uppercase tracking-[0.12em] text-[11px]">
              Shipping To
            </p>
            <button
              onClick={onEditAddress}
              className="font-sans text-ink text-[11px] uppercase tracking-[0.08em] border-b border-ink/40 hover:border-ink transition-colors duration-200"
            >
              Edit
            </button>
          </div>
          <p className="font-sans text-ink font-medium text-[13px]">
            {OrderDetails.customerName}
          </p>
          {formattedAddress.map((line, i) => (
            <p key={i} className="font-sans text-muted text-[13px]">
              {line}
            </p>
          ))}
          <div className="h-px bg-line my-3" />
          <p className="font-sans text-muted text-[13px]">
            {OrderDetails.customerPhonenumber}
          </p>
          <p className="font-sans text-muted text-[13px]">
            {OrderDetails.user_id.email}
          </p>
        </div>

      </div>

      {/* ── Right column — Order summary ─────────────────────────── */}
      <div className="w-full lg:w-[320px] xl:w-[360px] flex-shrink-0 lg:sticky lg:top-24">
        <div className="rounded-2xl p-6 border border-line bg-surface">
          <p className="font-sans text-muted font-normal uppercase tracking-[0.12em] text-[11px] mb-5">
            Order Summary
          </p>

          <div className="flex justify-between items-center mb-3.5">
            <p className="font-sans text-muted text-[13px]">Subtotal</p>
            <p className="font-sans text-ink/80 font-normal text-[14px]">
              {formatPrice(subtotal, currency)}
            </p>
          </div>

          <div className="flex justify-between items-center mb-3.5">
            <p className="font-sans text-muted text-[13px]">Shipping</p>
            <p className="font-sans text-ink/80 font-normal text-[14px]">
              {shipping > 0 ? formatPrice(shipping, currency) : "Free"}
            </p>
          </div>

          <div className="flex justify-between items-center mb-5 pb-5 border-t border-line pt-4">
            <p className="font-sans text-ink text-[13px]">Total</p>
            <p className="font-sans text-ink font-medium text-[16px]">
              {formatPrice(OrderDetails.totalLocal, currency)}
            </p>
          </div>

          <button
            onClick={onPayment}
            disabled={isLoading || !items || isPaying || items.length === 0}
            className="w-full h-12 bg-ink text-paper font-sans font-normal uppercase tracking-[0.1em] text-[11.5px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? <Loader /> : "Proceed to Payment"}
          </button>

          <p className="font-sans text-muted/70 text-[11px] text-center mt-3">
            You'll be redirected to {paymentProvider} to complete payment.
          </p>

          <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-line">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted" aria-hidden="true">
              <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3ZM9 12l2 2 4-4" />
            </svg>
            <span className="font-sans text-muted text-[11px]">Secure checkout, encrypted payments</span>
          </div>
        </div>
      </div>

    </div>
  );
}
