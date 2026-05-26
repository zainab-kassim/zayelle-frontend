'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Footer() {
    const router = useRouter();

    return (
        <footer className="w-full bg-white">

            {/* ── Top Rule ── */}
            <div className="w-full border-t border-[#C0C0C0]" />

            {/* ── Three Columns ── */}
            <div className="flex flex-row items-center justify-between  px-4 md:px-12 lg:px-34 py-4 gap-2">

                {/* Left — Brand */}
                <Link href="/">
                    <div className="flex-shrink-0">
                        <span
                            className="text-[12px] sm:text-[18px]  text-[#121111]"
                            style={{ fontFamily: "'DynaPuff', cursive", fontWeight: 500 }}
                        >
                            Zayelle
                        </span>
                    </div>
                </Link>

               

                {/* Right — Social Icons */}
                <div className="flex flex-row items-center gap-1.5 flex-shrink-0">

                    {/* TikTok */}
                    <Link href="https://www.tiktok.com/@zainab.temi">
                        <div
                            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#000000', border: '2px solid #333333' }}
                        >
                            <Image
                                src="https://n3tcxaxisw.ufs.sh/f/p7rFQhmUpn8yeCFWhd5yMac1xXHv3id62lYKz7WnIAeqRVO0"
                                alt="TikTok"
                                className=' w-3 h-3 md:w-5 md:h-5'
                                width={16}
                                height={16}
                            />
                        </div>
                    </Link>

                    {/* WhatsApp */}
                    <Link href="https://wa.me/2348103029972">
                        <div
                            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#20C68F', border: '2px solid #26F4BD' }}
                        >
                            <Image
                                src="https://n3tcxaxisw.ufs.sh/f/p7rFQhmUpn8y6ggsmdRCwJvp4gdrX9lUfa5nebhymT02KFWq"
                                alt="WhatsApp"
                                className=' w-3 h-3 md:w-5 md:h-5'
                                width={16}
                                height={16}
                            />
                        </div>
                    </Link>

                    {/* Instagram */}
                    <Link href="https://www.instagram.com/byzayelle/">
                        <div
                            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{
                                background: '#F426C7',
                                border: '2px solid #F426C7',
                            }}
                        >
                            <Image
                                src="https://n3tcxaxisw.ufs.sh/f/p7rFQhmUpn8yFODF4GRS7ceqfiTAQL0a4woRx2OGmPKUDjbl"
                                alt="Instagram"
                                className='font-bold w-3 h-3 md:w-5 md:h-5'
                                width={21}
                                height={21}
                            />
                        </div>
                    </Link>

                    {/* Facebook */}
                    <Link href="">
                        <div
                            className="w-6 h-6 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: '#2076C6', border: '2px solid #26C1F4' }}
                        >
                            <Image
                                src="https://img.icons8.com/?size=100&id=106163&format=png&color=FFFFFF"
                                alt="Facebook"
                                className=' w-3 h-3 md:w-5 md:h-5'
                                width={18}
                                height={18}
                            />
                        </div>
                    </Link>

                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="w-full bg-black py-4 flex items-center justify-center">
                <p
                    className="text-[9px] md:text-[14px] text-white font-medium text-center"
                >
                    © 2026 Zayelle. All rights reserved.
                </p>
            </div>

        </footer>
    );
}
