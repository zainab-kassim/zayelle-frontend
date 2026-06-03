"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner"; // swap for your toast library if different
import { addToCart } from "@/services/cart.service";
import { AddToCartPayload } from "@/types/cart";
import TinySpinner from "@/components/ui/TinySpinner";
import { AxiosError } from "axios";

interface AddToCartButtonProps {
    productid: number; // The product ID
}

export default function AddToCartButton({ productid }: AddToCartButtonProps) {
    const payload: AddToCartPayload = {
        productid,
        quantity: 1,
        size: "M",
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = async () => {
        console.log("button clicked", productid);
        // Block duplicate requests
        if (isLoading) return;

        setIsLoading(true);


        try {
            await addToCart(payload);
            toast.success("Added to cart successfully");
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError?.response?.status === 401) {
                toast.error("Please log in to add items to your cart");
            } else {
                toast.error("Failed to add item to cart");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleAddToCart}
            disabled={isLoading}
            aria-label={isLoading ? "Adding to cart..." : "Add to cart"}
            className="
        absolute right-1.5 md:right-3 top-1.5 md:top-2
        bg-white p-1 md:p-1.5 lg:p-2 rounded-full
        flex items-center justify-center
        disabled:opacity-70 disabled:cursor-not-allowed
        transition-opacity duration-200
      "
        >
            {isLoading ? (
                // Spinner — same dimensions as the icon to prevent layout shift
                <TinySpinner size={16} />
            ) : (
                <Image
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5"
                    src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000"
                    alt="Add to cart"
                    width={20}
                    height={20}
                />
            )}
        </button>
    );
}
