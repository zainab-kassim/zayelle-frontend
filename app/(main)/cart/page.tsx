"use client";

import { useState, useEffect } from "react";
import CartItems from "@/components/ui/CartItems";
import { getCartItems } from "@/services/cart.service";
import OrderSummary from "@/components/ui/OrderSummary";
import { useRouter } from "next/navigation";
import { useCurrencyStore } from "@/store/currencyStore";
import CartPageSkeleton from "@/components/ui/CartCardSkeleton";
import { deleteCartItem, updateCartQuantity } from "@/services/cart.service";
import { toast } from "sonner";
import { useCheckoutStore } from "@/store/checkoutStore";

export default function CartPage() {
  const { cartItems, setCartItems } = useCheckoutStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const currency = useCurrencyStore()

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchCartItems = async () => {
      try {
        const cartItems = await getCartItems();
        setCartItems(cartItems);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCartItems();
  }, [currency]);


  // ── Loading ────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <CartPageSkeleton />
    );
  }

  // ── Error ──────────────────────────────────────────────────────
  if (isError) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p
          className="text-[14px] text-[#5a5a5a] tracking-widest uppercase"
          style={{ fontFamily: '"Expletus Sans", serif' }}
        >
          Cart not found.
        </p>
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
    try {
      await Promise.all(
        cartItems.map((item) => updateCartQuantity(item.id, item.quantity))
      );
      router.push("/checkout");
    } catch (err) {
      toast.error("Failed to update order");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.unitprice * item.quantity,
    0
  );

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-8 lg:px-14 py-10">
      {/* ── Main layout ────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">

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
          />
        </div>

      </div>
    </div>

  );
}