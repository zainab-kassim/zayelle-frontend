'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import HeroDresses from '@/components/ui/Herodresses';

export default function HeroSection() {
    const router = useRouter();

    return (
        <section
            className="w-full h-auto rounded-b-3xl md:rounded-b-[54px]"
            style={{
                backgroundImage: "url('https://6gx805zq79.ufs.sh/f/XraPWYuH0sBR07tupyaABQJRDh7WIoKYUVMnCHz5TfXG6Oxj')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Inner content wrapper */}
            <div className="pt-24 md:pt-48 flex flex-col md:flex-row items-start  md:justify-between w-full min-h-screen md:px-12 lg:px-36">

                {/* Left Column — Text */}
                <div className="flex flex-col md:items-center px-6 md:px-2 pt-12 lg:pt-12  md:gap-14 md:flex-1">
                    <div>
                        {/* Eyebrow */}
                        <p className="text-[10px] pb-2 md:pb-4 sm:text-[12px] md:text-[14px] lg:text-[16px] text-[#1A1A1A] tracking-widest uppercase">
                            Summer Collection 2026
                        </p>

                        {/* Heading */}
                        <h1
                            className="text-[18px] hidden md:flex sm:text-[24px] md:text-[28px] lg:text-[38px] text-[#C2583A] w-full w-max-[500px] leading-tight uppercase"
                            style={{ fontFamily: "'DynaPuff', cursive", fontWeight: 800 }}
                        >
                            Step into Summer with the Floreal Collection
                        </h1>

                        <h1
                            className="text-[19px] flex md:hidden text-[#C2583A] w-full w-max-[500px] leading-tight uppercase"
                            style={{ fontFamily: "'DynaPuff', cursive", fontWeight: 800 }}
                        >
                            Summer is Here. Step into the Floreal Collection and Let Your Style Bloom.
                        </h1>
                    </div>

                    {/* CTA Button */}
                    <button
                        onClick={() => router.push('/products')}
                        className="self-start mt-2 px-10 py-3 hidden md:flex rounded-full bg-[#C2583A] text-white text-[12px] sm:text-[14px] md:text-[16px] font-bold uppercase cursor-pointer"
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                        Shop Now
                    </button>
                </div>

                {/* Right Column — HeroDresses (lg and above only) */}
                <div className="hidden md:flex flex-1 lg:pt-12 items-center justify-center">
                    <HeroDresses />
                </div>

                {/* Combined dress image (md and below only) */}
                <div className="flex md:hidden w-full justify-center">
                    <Image
                        src="/dresses/dresses-combined.png"
                        alt="Dresses"
                        width={700}
                        height={500}
                        className="w-full max-w-[700px] h-auto"

                        style={{ objectFit: 'contain', backgroundColor: 'transparent' }}
                    />
                </div>

                <div className='px-6'>
                    <button
                        onClick={() => router.push('/products')}
                        className="mb-10 flex md:hidden  px-8  py-2 rounded-full bg-[#C2583A] text-white text-[12px] sm:text-[14px] font-bold uppercase cursor-pointer"
                        style={{ fontFamily: "'Cairo', sans-serif" }}
                    >
                        Shop Now
                    </button>
                </div>


            </div>
        </section>
    );
}
