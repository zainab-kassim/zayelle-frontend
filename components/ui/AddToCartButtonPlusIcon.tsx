"use client";

import { useState } from "react";
import { showToast } from "@/lib/toast";
import { addToCart } from "@/services/cart.service";
import { AddToCartPayload } from "@/types/cart";
import TinySpinner from "@/components/ui/TinySpinner";
import { AxiosError } from "axios";

interface AddToCartButtonPlusIconProps {
    productid: number; // The product ID
    variant?: "icon" | "bar";
}

export default function AddToCartButtonPlusIcon({ productid, variant = "icon" }: AddToCartButtonPlusIconProps) {
    const payload: AddToCartPayload = {
        productid,
        quantity: 1,
        size: "M",
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        // Block duplicate requests
        if (isLoading) return;

        setIsLoading(true);


        try {
            await addToCart(payload);
            showToast.success("Added to cart successfully");
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError?.response?.status === 401) {
                showToast.error("Please log in to add items to your cart");
            } else {
                showToast.error("Failed to add item to cart");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (variant === "bar") {
        return (
            <button
                onClick={handleAddToCart}
                disabled={isLoading}
                aria-label={isLoading ? "Adding to cart..." : "Quick add to cart"}
                className="
          w-full bg-ink text-white
          py-3
          flex items-center justify-center gap-2
          font-sans font-semibold uppercase tracking-[0.14em] text-[11px]
          disabled:opacity-70 disabled:cursor-not-allowed
          transition-colors duration-200
          hover:bg-button-primary-active
        "
            >
                {isLoading ? <TinySpinner size={14} /> : "Quick Add"}
            </button>
        );
    }

    return (
        <button
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-label={isLoading ? "Adding to cart..." : "Add to cart"}
            className="
        absolute right-2 top-2
        w-7 h-7 md:w-8 md:h-8 flex-shrink-0
        rounded-full bg-paper/95 backdrop-blur-sm border border-line text-ink
        flex items-center justify-center
        shadow-[0_2px_6px_rgba(23,23,26,0.08)]
        transition-all duration-200
        hover:bg-ink hover:text-paper hover:border-ink
        disabled:opacity-70 disabled:cursor-not-allowed
      "
        >
            {isLoading ? (
                // Spinner — same footprint as the icon to prevent layout shift
                <TinySpinner size={14} />
            ) : (
                <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M12 5v14M5 12h14" />
                </svg>
            )}
        </button>
    );
}
