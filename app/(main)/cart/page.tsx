"use client";

import { useState, useEffect } from "react";
import CartItems from "@/components/ui/CartItems";
import { getCartItems } from "@/services/cart.service";
import OrderSummary from "@/components/ui/OrderSummary";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types/cart";

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCartItems();
      setCartItems(cartItems);
    };
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleDelete = (id: number) => {
    //fff
  };

  const handleClearCart = () => {
    //fff
  };

  const handleCheckout = () => {
    router.push("/checkout");
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
        <div className="flex-1 w-full overflow-y-auto max-h-[calc(100vh-70px)]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <CartItems
            CartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onDelete={handleDelete}
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