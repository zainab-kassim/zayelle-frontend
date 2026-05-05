'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const stored = localStorage.getItem('firstName');
        if (stored) setFirstName(stored);
    }, []);

    return (
        <>

            <div className="fixed top-8 md:top-10 left-0 right-0 z-50 flex justify-center px-4">
                <nav
                    className="w-full max-w-[1000px] rounded-full bg-white/40 px-7 md:px-14 py-2.5 md:py-3 flex items-center justify-between shadow-[-1px_2px_8px_0px_rgba(0,0,0,0.2)]"
                // style={{ backdropFilter: 'blur(10px)' }}
                >
                    {/* Left — Brand */}
                    <Link href="/">
                        <span
                            className=" text-[12px] md:text-[18px]  text-[#2C2420]"
                            style={{
                                fontFamily: "'DynaPuff', cursive",
                                fontWeight: 500,
                            }}
                        >
                            Zayelle
                        </span>
                    </Link>

                    {/* Right — Greeting + Bag */}
                    <div className="flex items-center gap-3">
                        <span
                            className="text-[11px] md:text-[16px] font-normal text-[#2C2420]"
                        >
                            hey, {firstName}
                        </span>

                        <Link href="/cart">
                            <div
                                className="flex items-center justify-center font-light w-6 h-6 md:w-10 md:h-9 rounded-full"
                                style={{ border: '0.2px solid #2C2420' }}
                            >

                                <Image
                                    src="https://img.icons8.com/?size=100&id=5ueBhwT0NbKz&format=png&color=000000"
                                    alt="Shopping bag"
                                    width={18}
                                    height={18}
                                    className="w-3 h-3 md:w-[18px] md:h-[18px]"
                                />
                            </div>
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}