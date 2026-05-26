'use client';

import { useCurrencyStore } from '@/store/currencyStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
    id: string | number;
    image: string[];
    name: string;
    price: string;
}

export default function ProductCard({ id, image, name, price }: ProductCardProps) {
    const router = useRouter();
const currency = useCurrencyStore((state) => state.currency);

    return (
        <div
            className="flex flex-col cursor-pointer rounded-md pb-4"
            style={{ background: '#F8F8F8' }}
            onClick={() => router.push(`/products/${id}`)}
        >
            {/* Image area */}
            <div className="relative pt-4">
                {/* Product image */}
                <div className="relative w-full h-[170px] md:h-[270px]">
                    <Image
                        src={image[0]}
                        alt={name}
                        fill
                        style={{ objectFit: 'contain', transform: 'scale(1.2)' }}
                    />
                </div>
            </div>

            {/* Info area */}
            <div className="px-4 pb-3 flex flex-col">

                {/* Price */}
                
                <div
                    className=" text-[12px] md:text-[16px] font-bold text-black"
                >
                    {currency === 'NGN' ? '₦' : '$'}{price}
                </div>

                {/* Name */}
                <div
                    className="text-[12px] md:text-sm pb-2 md:pb-5 uppercase text-black/75"
                >
                    {name}
                </div>

                {/* Add to cart button */}
                <button
                    className="w-full  py-2 text-[13px] font-bold uppercase bg-black rounded-lg text-white cursor-pointer"
    
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}