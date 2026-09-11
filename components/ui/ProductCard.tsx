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

export default function ProductCard({ id,slug, image, name, price, imageHeightClassName = 'h-[190px] md:h-[330px]', imageWrapperClassName = 'relative pb-3 pt-6 z-0' }: ProductCardProps) {
    const router = useRouter();
const currency = useCurrencyStore((state) => state.currency);

    return (
        <div
            className="group flex relative flex-col cursor-pointer rounded-lg md:rounded-xl lg:rounded-2xl pb-4 transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(26,20,16,0.1)]"
            onClick={() => router.push(`/products/${slug}`)}
            style={{ background: '#F8F8F8' }}

        >
             <div className='z-20' onClick={(e) => e.stopPropagation()}>
     <AddToCartButtonPlusIcon productid={id} />
             </div>
        
        <div  >
            {/* Image area */}
            
            <div  className={imageWrapperClassName}>
               
                {/* Product image */}
                <div className={`relative w-full ${imageHeightClassName} overflow-hidden`}>
                    <Image
                        src={image[0]}
                        alt={name}
                        fill
                        className="transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                        style={{ objectFit: 'contain' }}
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