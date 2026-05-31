'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const router = useRouter();
    const [firstName, setFirstName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const stored = localStorage.getItem('firstName');
        if (stored) setFirstName(stored);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <div className="fixed top-6 left-0 right-0 z-30 flex justify-center px-4 md:px-12 lg:px-34 xl:px-14 ">
                <nav
                    className="w-full max-w-full rounded-full bg-white/20 px-6 md:px-10 lg:px-14 py-2 md:py-2.5 flex items-center justify-between"
                    style={{
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(0, 0, 0, 0.1)',
                        boxShadow: '-1px 3px 10px rgba(0, 0, 0, 0.12)',
                    }}
                >
                    {/* LEFT — Brand */}
                    <Link href="/">
                        <span
                            className="text-[12px] sm:text-[16px] md:text-[18px] font-bold text-[#2C2420] cursor-pointer whitespace-nowrap flex-shrink-0"
                            style={{ fontFamily: "'DynaPuff', cursive" }}
                        >
                            Zayelle
                        </span>
                    </Link>

                    {/* CENTER — Navigation Links (Desktop only) */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-10 flex-1 justify-center">
                        <Link
                            href="/products"
                            className="text-[13px] lg:text-[14px] text-black cursor-pointer transition-opacity duration-300 hover:opacity-60 whitespace-nowrap"
                            style={{ fontFamily: "'Cairo', sans-serif" }}
                        >
                            Products
                        </Link>
                        <Link
                            href="/custom-order/book"
                            className="text-[13px] lg:text-[14px] text-black cursor-pointer transition-opacity duration-300 hover:opacity-60 whitespace-nowrap"
                            style={{ fontFamily: "'Cairo', sans-serif" }}
                        >
                            Book Custom Order
                        </Link>
                    </div>

                    {/* RIGHT — User & Actions */}
                    <div className="flex items-center gap-1 sm:gap-3 md:gap-5 ml-auto flex-shrink-0">
                        {/* User Dropdown Trigger */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-lg transition-all duration-300 hover:bg-black/5"
                            >
                                <span
                                    className="text-[11px] sm:text-[12px] md:text-[16px] text-black whitespace-nowrap"
                                    style={{ fontFamily: "'Cairo', sans-serif" }}
                                >
                                    hey, {firstName || 'there'}
                                </span>
                                <motion.div
                                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=99991&format=png&color=000000"
                                        alt="Dropdown"
                                        width={12}
                                        height={12}
                                    />
                                </motion.div>
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-[160px] sm:w-[180px] bg-white rounded-lg  shadow-lg overflow-hidden z-50"
                                    >
                                        {/* Currency Selector */}
                                        <button
                                            className="w-full flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-[13px] text-black transition-colors duration-200 hover:bg-gray-50"
                                            style={{ fontFamily: "'Cairo', sans-serif" }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src="https://img.icons8.com/?size=100&id=Y44czWs2GxGq&format=png&color=000000"
                                                    alt="Canada"
                                                    width={14}
                                                    height={14}
                                                />
                                                <span>CAD</span>
                                            </div>
                                            <Image
                                                src="https://img.icons8.com/?size=100&id=99991&format=png&color=000000"
                                                alt="Chevron"
                                                width={11}
                                                height={11}
                                            />
                                        </button>

                                        {/* Divider */}
                                        <div className="h-px bg-[#E0E0E0]" />

                                        {/* My Orders */}
                                        <Link
                                            href="/orders"
                                            className="w-full block px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-[13px] text-black transition-colors duration-200 hover:bg-gray-50"
                                            style={{ fontFamily: "'Cairo', sans-serif" }}
                                        >
                                            My Orders
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Shopping Bag */}
                        <Link
                            href="/cart"
                            className="flex items-center justify-center  transition-all duration-300 hover:bg-black/5 flex-shrink-0"
                        >
                            <Image
                                src="https://img.icons8.com/?size=100&id=5ueBhwT0NbKz&format=png&color=000000"
                                alt="Shopping Bag"
                                width={16}
                                height={16}
                                className=" sm:w-[19px] sm:h-[19px] md:w-[22px] md:h-[22px] lg:w-[24px] lg:h-[24px]"
                            />
                        </Link>

                        {/* Hamburger Menu (Mobile only) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 hover:bg-black/5"
                        >
                            <motion.div
                                transition={{ duration: 0.3 }}
                            >
                                <Image
                                    src="https://img.icons8.com/?size=100&id=TAcvUHWWyuTG&format=png&color=000000"
                                    alt="Menu"
                                    width={16}
                                    height={16}
                                />
                            </motion.div>
                        </button>
                    </div>
                </nav>
            </div>
           {/* Mobile Sidebar Menu */}
<AnimatePresence>
  {isMobileMenuOpen && (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-black/20 z-30 md:hidden"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed top-0 right-0 h-screen w-64 bg-white z-40 md:hidden shadow-lg"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="absolute top-6 right-6 flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-300 hover:bg-gray-50"
        >
          <Image
            src="https://img.icons8.com/?size=100&id=lXczJ2GQ3hgb&format=png&color=000000"
            alt="Close"
            width={20}
            height={20}
          />
        </button>

        <div className="flex flex-col p-6 pt-20">
          {/* Products */}
          <Link
            href="/products"
            className="px-4 py-4 text-[14px] text-black transition-colors duration-200 hover:bg-gray-50 rounded-b-lg border-b border-b-[#E0E0E0]"
            style={{ fontFamily: "'Cairo', sans-serif" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Products
          </Link>

          {/* Book Custom Order */}
          <Link
            href="#"
            className="px-4 py-4 text-[14px] text-black transition-colors duration-200 hover:bg-gray-50 rounded-lg"
            style={{ fontFamily: "'Cairo', sans-serif" }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book Custom Order
          </Link>
        </div>
      </motion.div>
    </>
  )}
</AnimatePresence>


        </>
    );
}