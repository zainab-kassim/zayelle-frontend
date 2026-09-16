"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { getProductBySlug } from "@/services/product.service";
import { addToCart } from "@/services/cart.service";
import { Product } from "@/types/product";
import ProductImageViewer from "@/components/shared/product/ProductImageViewer";
import ProductInfo from "@/components/shared/product/ProductInfo";
import FloralCollection from "@/components/shared/FlorealCollection";
import { slugifyCollectionName } from "@/lib/slugify";
import { useCurrencyStore } from "@/store/currencyStore";
import ProductDetailSkeleton from "@/components/shared/product/ProductDetailSkeleton";
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
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-serif text-ink text-[20px] sm:text-[24px]">
          Product not found
        </p>
        <p className="font-sans text-muted text-[13px] max-w-sm">
          This item may have sold out or the link may be out of date.
        </p>
        <Link
          href="/products"
          className="font-sans font-medium uppercase tracking-[0.1em] text-[11px] text-paper bg-ink rounded-full px-7 py-3 transition-opacity duration-200 hover:opacity-90"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const collectionSlug = product.collections?.name
    ? slugifyCollectionName(product.collections.name)
    : undefined;

  return (
    <div className="w-full bg-paper px-4 md:px-12 lg:px-34 xl:px-16 py-6 sm:py-8 pb-16 sm:pb-24 flex flex-col gap-10 sm:gap-16">

      <div>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5 sm:mb-7 flex items-center gap-1.5 flex-wrap font-sans text-[11px] uppercase tracking-[0.08em]">
          <Link href="/" className="text-muted hover:text-ink transition-colors duration-200">Home</Link>
          {product.collections?.name && collectionSlug && (
            <>
              <span className="text-muted/50">/</span>
              <Link
                href={`/products?collection=${collectionSlug}`}
                className="text-muted hover:text-ink transition-colors duration-200"
              >
                {product.collections.name}
              </Link>
            </>
          )}
          <span className="text-muted/50">/</span>
          <span className="text-ink normal-case tracking-normal truncate max-w-[200px]">{product.name}</span>
        </nav>

        {/* ── Desktop: 2-column layout ─────────────────────────────── */}
        <div className="hidden lg:flex flex-row gap-10 xl:gap-14 items-start">
          <div className="w-1/2 flex-shrink-0">
            <ProductImageViewer images={product.image} name={product.name} />
          </div>

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
        <div className="flex lg:hidden flex-col gap-6">
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

      {/* ── You Might Also Like ──────────────────────────────────── */}
      {collectionSlug && product.collections?.name && (
        <FloralCollection
          collection={collectionSlug}
          eyebrow="You Might Also Like"
          title={`More From ${product.collections.name}`}
          excludeSlug={product.slug}
          fixedWidth
          showQuickAdd={false}
        />
      )}

    </div>
  );
}
