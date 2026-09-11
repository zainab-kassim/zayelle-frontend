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
}

export default function ProductCard({ id,slug, image, name, price }: ProductCardProps) {
    const router = useRouter();
const currency = useCurrencyStore((state) => state.currency);

    return (
        <div 
            className="flex relative flex-col cursor-pointer rounded-lg md:rounded-xl lg:rounded-2xl pb-4"
            onClick={() => router.push(`/products/${slug}`)}
            style={{ background: '#F8F8F8' }}
            
        >
             <div className='z-20' onClick={(e) => e.stopPropagation()}>
     <AddToCartButtonPlusIcon productid={id} />
             </div>
        
        <div  >
            {/* Image area */}
            
            <div  className="relative pb-3 pt-6 z-0">
               
                {/* Product image */}
                <div className="relative w-full h-[170px] md:h-[300px]">
                    <Image
                        src={image[0]}
                        alt={name}
                        fill
                        style={{ objectFit: 'contain', transform: 'scale(1.28)' }}
                    />
                </div>
            </div>

            {/* Info area */}
            <div className="px-6 lg:px-8 pb-2 sm:pb-3 flex flex-col">

                {/* Price */}
                
                <div
                    className=" text-[12px] md:text-[18px] lg:text-[20px] font-bold text-black"
                >
                    {formatPrice(price, currency)}
                </div>

                {/* Name */}
                <div
                    className="text-[12px] md:text-[16px] lg:text-[17px]  uppercase text-[#101010] truncate"
                >
                    {name}
                </div>
            </div>
            </div>
        </div>
    );
}