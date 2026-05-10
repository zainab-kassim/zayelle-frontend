'use client';

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

    return (
        <div
            className="flex flex-col cursor-pointer"
            style={{ background: '#F8F8F8', borderRadius: '12px' }}
            onClick={() => router.push(`/products/${id}`)}
        >
            {/* Image area */}
            <div className="relative p-3">

                {/* Color dot — top right */}
                <div
                    className="absolute top-3 right-3 w-3 h-3 rounded-full z-10"
                    style={{ backgroundColor: '#000000' }}
                />

                {/* Product image */}
               <div className="relative w-full h-[300px] flex items-center justify-center">
  <Image
    src={image[0]}
    alt={name}
    fill
    style={{ objectFit: 'contain', padding: '16px' }}
  />
</div>
            </div>

            {/* Info area */}
            <div className="px-3 pb-3 flex flex-col gap-1">

                {/* Price */}
                <p
                    className="text-[14px] font-bold text-[#311F1F]"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                    {price}
                </p>

                {/* Name */}
                <p
                    className="text-[11px] uppercase text-[#311F1F]"
                    style={{ fontFamily: "'Cairo', sans-serif" }}
                >
                    {name}
                </p>

                {/* Add to cart button */}
                <button
                    className="w-full mt-2 py-2 text-[11px] font-bold uppercase text-white cursor-pointer"
                    style={{
                        backgroundColor: '#2C2420',
                        borderRadius: '6px',
                        fontFamily: "'Cairo', sans-serif",
                    }}
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