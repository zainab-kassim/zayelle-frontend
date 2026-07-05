"use client";

import Image from "next/image";
import { CartItem } from "@/types/cart";
import CartQuantitySelector from "./CartQuantitySelector";
import { useCurrencyStore } from "@/store/currencyStore";

interface ProductCartCardProps {
    CartItem: CartItem;
    onQuantityIncrease: (id: number) => void;
    onQuantityDecrease: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function ProductCartCard({
    CartItem,
    onQuantityIncrease,
    onQuantityDecrease,
    onDelete,
}: ProductCartCardProps) {
   const currency = useCurrencyStore((state) => state.currency);
    const totalItemPrice = CartItem.unitprice * CartItem.quantity;
    return (
        <div className="flex flex-row items-center gap-4 py-5 border-b border-[#f0f0f0]">

            {/* Product image */}
            <div
                className="flex-shrink-0 w-[100px] h-[120px] sm:w-[140px] sm:h-[140px]  md:w-[130px] md:h-[130px] rounded-lg flex items-center justify-center overflow-hidden"
                style={{ background: "#F8F8F8" }}
            >
                <Image
                    src={CartItem.product.image[0]}
                    alt='Product Image'
                    width={90}
                    height={90}
                    className="object-contain w-[85%] h-[85%]"
                />
            </div>

            {/* Product info */}
            <div className="flex flex-col flex-1 min-w-0">
                <p
                    className="text-[10px] md:text-[14px]  font-semibold text-[#1a1a1a] uppercase tracking-wide truncate "
                    style={{ fontFamily: '"Expletus Sans", serif' }}
                >
                    {CartItem.product.name}
                </p>

                <span className="flex flex-row items-center">

                    <p
                        className="text-[12px] md:text-[15px] text-[#8a8a8a] uppercase tracking-widest"
                        style={{ fontFamily: "Cairo, sans-serif" }}
                    >
                        {CartItem.size}
                    </p>
                    {CartItem.product.color && (
                        <p
                            className="text-[12px] md:text-[15px]  text-[#8a8a8a] uppercase tracking-widest"
                            style={{ fontFamily: "Cairo, sans-serif" }}
                        >
                            /{CartItem.product.color}
                        </p>
                    )}
                </span>
                <p
                    className=" text-[13px] md:text-[16px] font-semibold text-[#1a1a1a] mt-1"
                    style={{ fontFamily: '"Expletus Sans", serif' }}
                >
                    {currency === 'NGN' ? '₦' : '$'}{totalItemPrice.toFixed(2)}
                </p>

                {/* Quantity selector */}
                <div className="mt-2">
                    <CartQuantitySelector
                        quantity={CartItem.quantity}
                        onIncrease={() => onQuantityIncrease(CartItem.id)}
                        onDecrease={() => onQuantityDecrease(CartItem.id)}
                    />
                </div>
            </div>

            {/* Delete button */}
            <button
                onClick={() => onDelete(CartItem.id)}
                aria-label="Remove item"
                className="flex-shrink-0 p-2 text-[#8a8a8a] hover:text-[#1a1a1a] transition-colors duration-200"
            >
                <Image width={16} height={16} src="https://img.icons8.com/?size=100&id=99971&format=png&color=000000" alt="Delete" />
            </button>

        </div>
    );
}