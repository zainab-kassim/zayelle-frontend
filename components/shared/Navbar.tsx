'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrencyStore } from '@/store/currencyStore';
import { logout } from '@/services/auth.service';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

const SUPPORTED_CURRENCIES = ['USD', 'GBP', 'CAD', 'NGN'];

const CURRENCY_ICONS: Record<string, string> = {
    USD: "https://img.icons8.com/?size=100&id=Halaubi1vvya&format=png&color=000000",
    GBP: "https://img.icons8.com/?size=100&id=xapj7ZzAUZKI&format=png&color=000000",
    CAD: "https://img.icons8.com/?size=100&id=Y44czWs2GxGq&format=png&color=000000",
    NGN: "https://img.icons8.com/?size=100&id=Qbb2whnonplQ&format=png&color=000000",
};

const NAV_LINKS = [
    { label: 'Shop All', href: '/products' },
    { label: 'New Arrivals', href: '/products?collection=new-arrivals' },
    { label: 'Floreal Collection', href: '/products?collection=floreal-collection' },
    { label: 'Luxe Weave', href: '/products?collection=ember-collection' },
    { label: 'Custom Order', href: '/custom-order/book' },
];

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const [fullName, setFullName] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currency = useCurrencyStore((state) => state.currency);
    const setCurrency = useCurrencyStore((state) => state.setCurrency);

    useEffect(() => {
        const stored = localStorage.getItem('fullName');
        if (stored) setFullName(stored);
    }, []);

    useEffect(() => {
        if (!isDropdownOpen) return;

        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
                setIsCurrencyOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isDropdownOpen]);

    const handleCurrencySelect = (selected: string) => {
        setCurrency(selected);
        setIsCurrencyOpen(false);
        setIsDropdownOpen(false);
    };

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('fullName');
            localStorage.removeItem('email');
            setFullName('');
            setIsDropdownOpen(false);
            toast.success('Logged out successfully');
            router.push('/');
        }
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 z-30 bg-paper/95 backdrop-blur-sm border-b border-line">
                <nav className="w-full flex items-center justify-between px-4 md:px-12 lg:px-34 xl:px-16 py-3 md:py-4">

                    {/* LEFT — Brand */}
                    <Link href="/" className="flex-shrink-0">
                        <span className="font-serif text-[20px] sm:text-[22px] md:text-[25px] font-normal text-ink tracking-normal">
                            Zayelle
                        </span>
                    </Link>

                    {/* CENTER — Navigation Links (Desktop only) */}
                    <div className="hidden xl:flex items-center gap-6 flex-1 justify-center">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="font-sans text-[12px] uppercase tracking-[0.12em] text-ink/80 cursor-pointer transition-colors duration-200 hover:text-ink whitespace-nowrap"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* RIGHT — User & Actions */}
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-6 ml-auto flex-shrink-0">
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center gap-1.5 px-1 sm:px-2 py-1.5 rounded-md transition-colors duration-200 hover:bg-ink/5"
                            >
                                <span className="font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.08em] max-w-24 text-ink whitespace-nowrap overflow-hidden text-ellipsis">
                                    {fullName ? `Hey, ${fullName}` : 'Sign In'}
                                </span>
                                <motion.div
                                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=99991&format=png&color=000000"
                                        alt="Dropdown"
                                        width={11}
                                        height={11}
                                    />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-3 w-[170px] sm:w-[190px] bg-white rounded-lg border border-line shadow-[0_12px_28px_rgba(23,23,26,0.1)] overflow-hidden z-50"
                                    >
                                        {/* Currency Selector */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                                                 disabled={pathname === '/checkout'}
                                                className="w-full flex items-center justify-between px-4 py-3 font-sans text-[12px] text-ink transition-colors duration-200 hover:bg-surface"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Image
                                                        src={CURRENCY_ICONS[currency] || CURRENCY_ICONS['USD']}
                                                        alt="Currency"
                                                        width={14}
                                                        height={14}
                                                    />
                                                    <span>{currency || '...'}</span>
                                                </div>

                                                <motion.div
                                                    animate={{ rotate: isCurrencyOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <Image
                                                        src="https://img.icons8.com/?size=100&id=99991&format=png&color=000000"
                                                        alt="Chevron"
                                                        className={`${pathname === '/checkout' && 'hidden'}`}
                                                        width={11}
                                                        height={11}
                                                    />
                                                </motion.div>
                                            </button>

                                            {/* Currency Sub-dropdown */}
                                            <AnimatePresence>
                                                {isCurrencyOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -5 }}
                                                        transition={{ duration: 0.15 }}
                                                        className="bg-surface border-t border-line"
                                                    >

                                                        {SUPPORTED_CURRENCIES.map((c) => (
                                                            <button
                                                                key={c}
                                                                onClick={() => handleCurrencySelect(c)}
                                                                className={`w-full text-left px-6 py-2 font-sans text-[12px] transition-colors duration-200 hover:bg-white flex items-center gap-2 ${currency === c ? 'font-semibold text-ink' : 'text-muted'
                                                                    }`}
                                                            >
                                                                <Image
                                                                    src={CURRENCY_ICONS[c]}
                                                                    alt={c}
                                                                    width={14}
                                                                    height={14}
                                                                />
                                                                {c}
                                                            </button>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                        <div className="h-px bg-line" />

                                        {fullName ? (
                                            <button
                                                onClick={handleLogout}
                                                className="w-full block px-4 py-3 font-sans text-[12px] text-ink transition-colors duration-200 hover:bg-surface text-left"
                                            >
                                                Logout
                                            </button>
                                        ) : (
                                            <Link
                                                href="/auth/signup"
                                                className="w-full block px-4 py-3 font-sans text-[12px] text-ink transition-colors duration-200 hover:bg-surface"
                                            >
                                                Sign Up
                                            </Link>
                                        )}

                                        <div className="h-px bg-line" />

                                        <Link
                                            href="/orders"
                                            className="w-full block px-4 py-3 font-sans text-[12px] text-ink transition-colors duration-200 hover:bg-surface"
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
                            className="flex items-center justify-center transition-opacity duration-200 hover:opacity-60 flex-shrink-0"
                        >
                            <Image
                                src="https://img.icons8.com/?size=100&id=5ueBhwT0NbKz&format=png&color=000000"
                                alt="Shopping Bag"
                                width={17}
                                height={17}
                                className="sm:w-[19px] sm:h-[19px] md:w-[21px] md:h-[21px]"
                            />
                        </Link>

                        {/* Hamburger Menu (Mobile only) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="xl:hidden flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-200 hover:bg-ink/5"
                        >
                            <Image
                                src="https://img.icons8.com/?size=100&id=TAcvUHWWyuTG&format=png&color=000000"
                                alt="Menu"
                                width={16}
                                height={16}
                            />
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-ink/20 z-30 xl:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-0 right-0 h-screen w-72 bg-white z-40 xl:hidden shadow-lg"
                        >
                            <div className="flex items-center justify-between px-6 py-5 border-b border-line">
                                <span className="font-serif text-[19px] font-normal text-ink">Zayelle</span>
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="flex items-center justify-center w-7 h-7 rounded-md transition-colors duration-200 hover:bg-surface"
                                >
                                    <Image
                                        src="https://img.icons8.com/?size=100&id=lXczJ2GQ3hgb&format=png&color=000000"
                                        alt="Close"
                                        width={18}
                                        height={18}
                                    />
                                </button>
                            </div>
                            <div className="flex flex-col p-6 gap-1">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.label}
                                        href={link.href}
                                        className="font-sans text-[13px] uppercase tracking-[0.1em] text-ink py-4 border-b border-line transition-colors duration-200 hover:opacity-60"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                {fullName ? (
                                    <button
                                        onClick={handleLogout}
                                        className="font-sans text-[13px] uppercase tracking-[0.1em] text-left text-ink py-4 border-b border-line transition-colors duration-200 hover:opacity-60"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link
                                        href="/auth/signup"
                                        className="font-sans text-[13px] uppercase tracking-[0.1em] text-ink py-4 border-b border-line transition-colors duration-200 hover:opacity-60"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
