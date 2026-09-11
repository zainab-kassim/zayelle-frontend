"use client";

import { use, useState, useEffect } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { getProductBySlug } from "@/services/product.service";
import { addToCart } from "@/services/cart.service";
import { Product } from "@/types/product";
import ProductImageViewer from "@/components/shared/product/ProductImageViewer";
import ProductInfo from "@/components/shared/product/ProductInfo";
import { useCurrencyStore } from "@/store/currencyStore";
import ProductDetailSkeleton from "@/components/shared/product/ProductsdetailsSection";
import { useAsyncData } from "@/hooks/UseAsyncData";


interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductSlugPage({ params }: PageProps) {
  const { slug } = use(params);
  const { currency } = useCurrencyStore();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // ── Fetch product ──────────────────────────────────────────────
  const { data: product, isLoading, error } = useAsyncData<Product | null>(
    () => getProductBySlug(slug),
    [slug, currency],
    null
  );
  const isError = Boolean(error);

  useEffect(() => {
    if (product?.size?.length) setSelectedSize(product.size[0]);
  }, [product]);

  // ── Add to cart ────────────────────────────────────────────────
  const handleAddToCart = async () => {
    if (!product || !selectedSize) return;
    setIsAddingToCart(true);
    try {
      await addToCart({ productid: (product.id), quantity, size: selectedSize });
      toast.success("Added to cart successfully");
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError?.response?.status === 401) {
        toast.error("Please log in to add items to your cart");
      } else {
        toast.error("Failed to add item to cart");
      }
    } finally {
      setIsAddingToCart(false);
    }
  };

  // ── Loading ────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <ProductDetailSkeleton />
    );
  }

  // ── Error ──────────────────────────────────────────────────────
  if (isError || !product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <p
          className="text-[14px] text-[#5a5a5a] tracking-widest uppercase"
          style={{ fontFamily: '"Expletus Sans", serif' }}
        >
          Product not found.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full   px-4 md:px-12 lg:px-34 xl:px-16 py-8 bg-white">

      {/* ── Desktop: 2-column layout ─────────────────────────────── */}
      <div className="hidden lg:flex flex-row gap-10 items-start">
        {/* Left — image viewer (55%) */}
        <div className="w-[50%] flex-shrink-auto ">
          <ProductImageViewer images={product.image} name={product.name} />
        </div>

        {/* Right — product info (45%) */}
        <div className="flex-1 flex flex-col">
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            quantity={quantity}
            onSizeChange={setSelectedSize}
            onIncrease={() => setQuantity(q => q + 1)}
            onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
            onAddToCart={handleAddToCart}
            isAddingToCart={isAddingToCart}
          />
        </div>

      </div>

      {/* ── Mobile: single column ────────────────────────────────── */}
      <div className="flex lg:hidden flex-col gap-6 mb-12">
        <ProductImageViewer images={product.image} name={product.name} />
        <ProductInfo
          product={product}
          selectedSize={selectedSize}
          quantity={quantity}
          onSizeChange={setSelectedSize}
          onIncrease={() => setQuantity(q => q + 1)}
          onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
          onAddToCart={handleAddToCart}
          isAddingToCart={isAddingToCart}
        />
      </div>

    </div>
  );
}