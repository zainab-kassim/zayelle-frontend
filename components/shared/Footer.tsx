'use client';

import Image from 'next/image';
import Link from 'next/link';

const SHOP_LINKS = [
    { label: 'All Products', href: '/products' },
    { label: 'Floreal Collection', href: '/products?collection=floreal-collection' },
    { label: 'Zayelle Luxe Weave', href: '/products?collection=ember-collection' },
    { label: 'New Arrivals', href: '/products?collection=new-arrivals' },
];

const ACCOUNT_LINKS = [
    { label: 'My Orders', href: '/orders' },
    { label: 'Cart', href: '/cart' },
    { label: 'Book a Custom Order', href: '/custom-order/book' },
    { label: 'Sign In', href: '/auth/login' },
];

const SOCIALS = [
    {
        label: 'TikTok',
        href: 'https://www.tiktok.com/@zainab.temi',
        bg: '#000000',
        border: '#333333',
        src: 'https://n3tcxaxisw.ufs.sh/f/p7rFQhmUpn8yeCFWhd5yMac1xXHv3id62lYKz7WnIAeqRVO0',
        w: 16,
        h: 16,
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/2348103029972',
        bg: '#20C68F',
        border: '#26F4BD',
        src: 'https://n3tcxaxisw.ufs.sh/f/p7rFQhmUpn8y6ggsmdRCwJvp4gdrX9lUfa5nebhymT02KFWq',
        w: 16,
        h: 16,
    },
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/byzayelle/',
        bg: '#F426C7',
        border: '#F426C7',
        src: 'https://n3tcxaxisw.ufs.sh/f/p7rFQhmUpn8yFODF4GRS7ceqfiTAQL0a4woRx2OGmPKUDjbl',
        w: 21,
        h: 21,
    },
    {
        label: 'Facebook',
        href: 'https://facebook.com/byzayelle',
        bg: '#2076C6',
        border: '#26C1F4',
        src: 'https://img.icons8.com/?size=100&id=106163&format=png&color=FFFFFF',
        w: 18,
        h: 18,
    },
];

function FooterColumnHeading({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-sans text-paper font-semibold uppercase tracking-[0.2em] text-[11px] mb-4">
            {children}
        </p>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="font-sans block text-paper/70 hover:text-paper transition-colors duration-200 no-underline text-[13px]"
        >
            {children}
        </Link>
    );
}

export default function Footer() {
    return (
        <footer className="w-full bg-ink">

            {/* ── Main grid ── */}
            <div className="px-4 md:px-12 lg:px-34 xl:px-16 pt-12 sm:pt-16 pb-10 sm:pb-12">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">

                    {/* Brand */}
                    <div className="col-span-2 lg:col-span-2 flex flex-col gap-4">
                        <Link href="/" className="w-fit">
                            <span className="font-serif text-paper text-[24px] font-semibold tracking-tight">
                                Zayelle
                            </span>
                        </Link>
                        <p className="font-sans text-paper/65 max-w-xs leading-relaxed text-[13px]">
                            Designed for every version of you. Fashion pieces crafted for how you actually live, with custom orders and worldwide currency support.
                        </p>

                        {/* Socials */}
                        <div className="flex flex-row items-center gap-2 mt-1">
                            {SOCIALS.map((social) => (
                                <Link key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
                                    <div
                                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
                                        style={{ background: social.bg, border: `2px solid ${social.border}` }}
                                    >
                                        <Image src={social.src} alt={social.label} className="w-4 h-4" width={social.w} height={social.h} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <FooterColumnHeading>Shop</FooterColumnHeading>
                        <div className="flex flex-col gap-3">
                            {SHOP_LINKS.map((link) => (
                                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                            ))}
                        </div>
                    </div>

                    {/* Account */}
                    <div>
                        <FooterColumnHeading>Account</FooterColumnHeading>
                        <div className="flex flex-col gap-3">
                            {ACCOUNT_LINKS.map((link) => (
                                <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Bottom bar ── */}
            <div className="border-t border-white/10 px-4 md:px-12 lg:px-34 xl:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="font-sans text-paper/50 text-center text-[12px]">
                    © 2026 Zayelle. All rights reserved.
                </p>
                <p className="font-sans text-paper/50 text-center text-[12px]">
                    Secure checkout powered by Stripe &amp; Paystack
                </p>
            </div>

        </footer>
    );
}
