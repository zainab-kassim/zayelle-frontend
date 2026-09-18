"use client";

import { useCurrencyStore } from "@/store/currencyStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { formatPrice } from "@/lib/currency";
import Loader from "@/components/ui/Loader";

interface OrderSummaryProps {
  subtotal: number;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}

export default function OrderSummary({ subtotal, onCheckout, isCheckingOut = false }: OrderSummaryProps) {
  const currency = useCurrencyStore((state) => state.currency);
  const cartItems = useCheckoutStore((state) => state.cartItems);

  return (
    <div className="bg-surface rounded-2xl p-6 flex flex-col gap-4">
      <h2 className="font-sans text-muted font-normal uppercase tracking-[0.14em] text-[11px]">
        Order Summary
      </h2>

      <div className="flex flex-row items-center justify-between">
        <span className="font-sans text-muted text-[13px]">Subtotal</span>
        <span className="font-sans text-ink/80 font-normal text-[14px]">
          {formatPrice(subtotal, currency)}
        </span>
      </div>

      <p className="font-sans text-muted text-[11.5px] border-t border-line pt-4">
        Shipping will be calculated at checkout.
      </p>

      <button
        disabled={!cartItems || cartItems.length === 0 || isCheckingOut}
        onClick={onCheckout}
        className="w-full h-12 bg-ink text-paper font-sans font-medium uppercase tracking-[0.1em] text-[12px] flex items-center justify-center transition-opacity duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isCheckingOut ? <Loader /> : "Checkout"}
      </button>
    </div>
  );
}
