'use client';

import { useCurrencyStore } from '@/store/currencyStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


interface ProductCardProps {
    id: number;
    image: string[];
    name: string;
    price: string;
    slug: string;
}

export default function ProductListingCard({ id,slug, image, name, price }: ProductCardProps) {
    const router = useRouter();
const currency = useCurrencyStore((state) => state.currency);

    return (
        <div key={id} onClick={() => router.push(`/products/${slug}`)}
            className="flex relative flex-col cursor-pointer rounded-lg md:rounded-xl lg:rounded-2xl pb-4"
            style={{ background: '#F8F8F8' }}
            
        >
             
            {/* Image area */}
            <div className="relative pt-3 pb-1 z-0">
               
                {/* Product image */}
                <div className="relative mx-auto w-[70%] h-[170px] md:h-[270px]">
                    <Image
                        src={image[0]}
                        alt={name}
                        fill
                        style={{ objectFit: 'contain', transform: 'scale(1.08)' }}
                    />
                </div>
            </div>

            {/* Info area */}
            <div className="px-6 lg:px-8 pb-2  flex flex-col">

                {/* Price */}
                
                <div
                    className=" text-[12px] md:text-[18px] lg:text-[20px] font-bold text-black"
                >
                    {currency === 'NGN' ? '₦' : '$'}{price}
                </div>

               {/* Name */}
                <div
                    className="text-[12px] md:text-[16px] lg:text-[17px]  uppercase text-[#101010] truncate"
                >
                    {name}
                </div>
                
            </div>
        </div>
    );
}