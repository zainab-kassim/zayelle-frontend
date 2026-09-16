'use client';

import { useCurrencyStore } from '@/store/currencyStore';
import { formatPrice } from '@/lib/currency';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AddToCartButtonPlusIcon from './AddToCartButtonPlusIcon';

interface ProductCardProps {
    id: number;
    image: string[];
    name: string;
    price: number;
    slug: string;
    imageHeightClassName?: string;
    imageWrapperClassName?: string;
    imageInsetClassName?: string;
    showQuickAdd?: boolean;
    nameClassName?: string;
    priceClassName?: string;
    isNew?: boolean;
}

export default function ProductCard({
    id, slug, image, name, price,
    imageHeightClassName = 'h-[190px] md:h-[330px]',
    imageWrapperClassName = 'relative pb-3 pt-6 z-0',
    imageInsetClassName = 'inset-6 sm:inset-8',
    showQuickAdd = true,
    nameClassName = 'text-[11px] md:text-[12px] tracking-[0.06em]',
    priceClassName = 'text-[13px] sm:text-[14px] md:text-[16px] lg:text-[17px]',
    isNew = false,
}: ProductCardProps) {
    const router = useRouter();
    const currency = useCurrencyStore((state) => state.currency);

    return (
        <div
            className="group flex flex-col cursor-pointer"
            onClick={() => router.push(`/products/${slug}`)}
        >
            {/* Image area */}
            <div className={imageWrapperClassName}>
                <div className={`relative w-full bg-surface overflow-hidden ${imageHeightClassName}`}>
                    {/* Inset so the garment sits with breathing room instead of
                        filling the frame edge-to-edge — the source photos carry
                        inconsistent padding, this keeps the display size uniform
                        regardless. */}
                    <div className={`absolute ${imageInsetClassName}`}>
                        <Image
                            src={image[0]}
                            alt={name}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>

                    {/* New badge — only for products actually in the
                        new-arrivals collection, not decorative. */}
                    {isNew && (
                        <span className="absolute top-2 left-2 bg-paper text-ink border border-line rounded-full px-2.5 py-1 font-sans text-[9px] font-medium uppercase tracking-[0.08em]">
                            New
                        </span>
                    )}

                    {/* Quick-add icon */}
                    {showQuickAdd && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <AddToCartButtonPlusIcon productid={id} />
                        </div>
                    )}
                </div>
            </div>

            {/* Info area */}
            <div className="pt-3 flex flex-col gap-1">
                <div className={`font-sans uppercase text-muted truncate ${nameClassName}`}>
                    {name}
                </div>
                <div className={`font-sans font-medium text-ink ${priceClassName}`}>
                    {formatPrice(price, currency)}
                </div>
            </div>
        </div>
    );
}
