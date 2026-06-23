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

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductSlugPage({ params }: PageProps) {
  const { slug } = use(params);
  const { currency } = useCurrencyStore();

  const [product,        setProduct]        = useState<Product | null>(null);
  const [isLoading,      setIsLoading]      = useState(true);
  const [isError,        setIsError]        = useState(false);
  const [selectedSize,   setSelectedSize]   = useState("");
  const [quantity,       setQuantity]       = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  // ── Fetch product ──────────────────────────────────────────────
  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        if (data.size?.length) setSelectedSize(data.size[0]);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [slug,currency]);

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
      <ProductDetailSkeleton/>
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
    <main className="w-full min-h-screen px-4 sm:px-6 lg:px-12 py-8 bg-white">

      {/* ── Desktop: 2-column layout ─────────────────────────────── */}
      <div className="hidden md:flex flex-row gap-10 lg:gap-10 items-start">

        {/* Left — image viewer (55%) */}
        <div className="w-[50%] flex-shrink-0">
          <ProductImageViewer images={product.image} name={product.name} />
        </div>

        {/* Right — product info (45%) */}
        <div className="flex-1 pt-2">
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
      <div className="flex md:hidden flex-col gap-6">
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

    </main>
  );
}