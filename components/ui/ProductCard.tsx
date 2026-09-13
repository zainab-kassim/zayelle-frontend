'use client';

import { useCurrencyStore } from '@/store/currencyStore';
import { formatPrice } from '@/lib/currency';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AddToCartButtonPlusIcon from './AddtoCartButtonPlusIcon';

interface ProductCardProps {
    id: number;
    image: string[];
    name: string;
    price: string;
    slug: string;
    imageHeightClassName?: string;
    imageWrapperClassName?: string;
}

export default function ProductCard({ id, slug, image, name, price, imageHeightClassName = 'h-[190px] md:h-[330px]', imageWrapperClassName = 'relative pb-3 pt-6 z-0' }: ProductCardProps) {
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
                    <Image
                        src={image[0]}
                        alt={name}
                        fill
                        style={{ objectFit: 'contain' }}
                    />

                    {/* Quick-add icon */}
                    <div onClick={(e) => e.stopPropagation()}>
                        <AddToCartButtonPlusIcon productid={id} />
                    </div>
                </div>
            </div>

            {/* Info area */}
            <div className="pt-3 flex flex-col gap-1">
                <div className="font-sans text-[11px] md:text-[12px] tracking-[0.06em] uppercase text-muted truncate">
                    {name}
                </div>
                <div className="font-sans text-[13px] sm:text-[14px] md:text-[16px] lg:text-[17px] font-semibold text-ink">
                    {formatPrice(price, currency)}
                </div>
            </div>
        </div>
    );
}
