"use client";

import Link from "next/link";
import Image from "next/image";
import { CartItem } from "@/types/cart";
import CartQuantitySelector from "./CartQuantitySelector";
import { useCurrencyStore } from "@/store/currencyStore";
import { formatPrice } from "@/lib/currency";

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
        <div className="flex flex-row items-start gap-4 sm:gap-5 py-6 border-b border-line">

            {/* Product image */}
            <Link
                href={`/products/${CartItem.product.slug}`}
                className="flex-shrink-0 w-[100px] h-[120px] sm:w-[130px] sm:h-[130px] bg-surface rounded-xl flex items-center justify-center overflow-hidden"
            >
                <Image
                    src={CartItem.product.image[0]}
                    alt={CartItem.product.name}
                    width={90}
                    height={90}
                    className="object-contain w-[75%] h-[75%]"
                />
            </Link>

            {/* Product info */}
            <div className="flex flex-col flex-1 min-w-0 gap-1.5">
                <Link href={`/products/${CartItem.product.slug}`}>
                    <p className="font-serif text-ink/85 text-[14px] sm:text-[16px] leading-snug truncate">
                        {CartItem.product.name}
                    </p>
                </Link>

                <p className="font-sans text-muted uppercase tracking-[0.1em] text-[11px]">
                    Size {CartItem.size}
                    {CartItem.product.color && ` · ${CartItem.product.color}`}
                </p>

                <p className="font-sans text-ink text-[13px] sm:text-[14px]">
                    {formatPrice(totalItemPrice, currency)}
                </p>

                <div className="mt-1.5">
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
                className="flex-shrink-0 p-1.5 text-muted hover:text-ink transition-colors duration-200"
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
                    <path d="M10 11v6M14 11v6" />
                </svg>
            </button>

        </div>
    );
}
