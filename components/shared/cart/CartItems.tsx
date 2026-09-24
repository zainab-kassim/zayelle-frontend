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
