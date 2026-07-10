"use client";

import { CartItem } from "@/types/cart";
import ProductCartCard from "./ProductCartCard";

interface CartItemsProps {
  CartItems: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onDelete: (id: number) => void;
}


export default function CartItems({
  CartItems,
  onUpdateQuantity,
  onDelete,
}: CartItemsProps) {
  if (CartItems.length === 0) {
    return (
      <div className="flex items-center justify-center py-16">
        <p
          className="text-[13px] text-[#aaa] tracking-widest uppercase"
          style={{ fontFamily: '"Expletus Sans", serif' }}
        >
          Your cart is empty.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {CartItems.map((item) => (
        <ProductCartCard
          key={item.id}
          CartItem={item}
          onQuantityIncrease={() =>
            onUpdateQuantity(item.id, item.quantity + 1)
          }
          onQuantityDecrease={() =>
            onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
          onDelete={onDelete}

        />
      ))}
    </div>
  );
}