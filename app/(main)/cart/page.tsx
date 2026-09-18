"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CartItems from "@/components/ui/CartItems";
import { getCartItems } from "@/services/cart.service";
import OrderSummary from "@/components/ui/OrderSummary";
import { useRouter } from "next/navigation";
import { useCurrencyStore } from "@/store/currencyStore";
import CartPageSkeleton from "@/components/ui/CartCardSkeleton";
import { deleteCartItem, updateCartQuantity } from "@/services/cart.service";
import { toast } from "sonner";
import { useCheckoutStore } from "@/store/checkoutStore";
import { CartItem } from "@/types/cart";
import { useAsyncData } from "@/hooks/UseAsyncData";

export default function CartPage() {
  const { cartItems, setCartItems, resetCheckout } = useCheckoutStore();
  const router = useRouter();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const currency = useCurrencyStore()

  const { data: fetchedCartItems, isLoading, error } = useAsyncData<CartItem[]>(
    () => getCartItems(),
    [currency],
    []
  );
  const isError = Boolean(error);

  useEffect(() => {
    setCartItems(fetchedCartItems);
  }, [fetchedCartItems, setCartItems]);


  // ── Loading ────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <CartPageSkeleton />
    );
  }

  // ── Error ──────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="w-full bg-paper min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-serif text-ink text-[20px] sm:text-[24px]">
          We couldn't load your cart
        </p>
        <p className="font-sans text-muted text-[13px] max-w-sm">
          Something went wrong on our end. In the meantime, take a look at what's new.
        </p>
        <Link
          href="/products"
          className="font-sans font-medium uppercase tracking-[0.1em] text-[12px] text-paper bg-ink h-12 px-8 inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
        >
          Shop All
        </Link>
      </div>
    );
  }

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };


  const handleDeleteItem = async (id: number) => {
    try {
      await deleteCartItem(id);
      setCartItems(cartItems.filter((item) => item.id !== id));
    } catch (err) {
      toast.error("Failed to remove item");
    }
  };


  const handleCheckout = async () => {
    if (isCheckingOut) return; // block duplicate submits
    setIsCheckingOut(true);
    try {
      await Promise.all(
        cartItems.map((item) => updateCartQuantity(item.id, item.quantity))
      );
      resetCheckout();
      router.push("/checkout");
    } catch (err) {
      toast.error("Failed to update order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitprice * item.quantity,
    0
  );

  // ── Empty ──────────────────────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-paper min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-serif text-ink text-[20px] sm:text-[24px]">
          Your cart is empty
        </p>
        <p className="font-sans text-muted text-[13px] max-w-sm">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/products"
          className="font-sans font-medium uppercase tracking-[0.1em] text-[12px] text-paper bg-ink h-12 px-8 inline-flex items-center justify-center transition-opacity duration-200 hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-8 sm:py-10 pb-16 sm:pb-24">

      <h1 className="font-serif text-ink/80 font-normal text-[17px] sm:text-[20px] mb-6 sm:mb-8">
        Your Cart <span className="text-muted text-[13px] sm:text-[14px]">({cartItems.length} {cartItems.length === 1 ? "Item" : "Items"})</span>
      </h1>

      {/* ── Main layout ────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

        {/* Left — cart items */}
        <div className="flex-1 w-full lg:overflow-y-auto lg:max-h-[calc(100vh-70px)]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <CartItems
            CartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onDelete={handleDeleteItem}
          />
        </div>

        {/* Right — order summary */}
        <div className="w-full lg:w-[300px] xl:w-[390px] flex-shrink-0">
          <OrderSummary
            subtotal={subtotal}
            onCheckout={handleCheckout}
            isCheckingOut={isCheckingOut}
          />
        </div>

      </div>
    </div>

  );
}
