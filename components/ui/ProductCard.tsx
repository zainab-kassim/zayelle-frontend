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
            className="flex relative flex-col cursor-pointer rounded-md md:rounded-xl lg:rounded-2xl pb-4"
            style={{ background: '#F8F8F8' }}
            onClick={() => router.push(`/products/${id}`)}
        >
             <div className='absolute right-1.5 md:right-3 top-1.5 md:top-2 bg-white p-1 md:p-1.5 lg:p-2 rounded-full'>
                <Image className='justify-center w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5' src="https://img.icons8.com/?size=100&id=96645&format=png&color=000000" alt="plus" width={20} height={20} />
             </div>
            {/* Image area */}
            <div className="relative pb-4 pt-10">
               
                {/* Product image */}
                <div className="relative w-full h-[170px] md:h-[300px]">
                    <Image
                        src={image[0]}
                        alt={name}
                        fill
                        style={{ objectFit: 'contain', transform: 'scale(1.30)' }}
                    />
                </div>
            </div>

            {/* Info area */}
            <div className="px-6 lg:px-8 pb-2 sm:pb-3 flex flex-col">

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