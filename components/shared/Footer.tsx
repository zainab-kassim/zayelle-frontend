'use client';

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

// Monochrome brand-mark glyphs (single-path SVGs, fill="currentColor") so
// every icon renders at identical weight/size and inherits the footer's
// ink/paper palette instead of shipping four mismatched colored PNG badges.
function TikTokIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
            <path d="M16.6 5.82c-.92-.8-1.47-1.96-1.55-3.28h-3.13v13.3c0 1.6-1.3 2.9-2.9 2.9a2.9 2.9 0 0 1-2.9-2.9 2.9 2.9 0 0 1 2.9-2.9c.28 0 .56.04.82.12V9.9a6.1 6.1 0 0 0-.82-.05A6.05 6.05 0 0 0 3 15.9a6.05 6.05 0 0 0 6.02 6.05 6.05 6.05 0 0 0 6.02-6.05V9.18a8.85 8.85 0 0 0 5.13 1.64V7.7a5.37 5.37 0 0 1-3.57-1.88Z" />
        </svg>
    );
}

function WhatsAppIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Zm-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26C2.16 6.44 6.6 2 12.05 2a9.82 9.82 0 0 1 6.99 2.9 9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.88 9.89ZM12.05 0h-.03C5.5 0 .16 5.34.15 11.9c0 2.1.55 4.15 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.9-11.9a11.82 11.82 0 0 0-3.48-8.41A11.82 11.82 0 0 0 12.05 0Z" />
        </svg>
    );
}

function InstagramIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
            <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.4 2.23.06 1.27.08 1.65.08 4.85s-.02 3.58-.08 4.85c-.04 1.17-.24 1.8-.4 2.23a3.7 3.7 0 0 1-.9 1.38 3.7 3.7 0 0 1-1.38.9c-.42.16-1.06.36-2.23.4-1.27.06-1.64.08-4.85.08s-3.58-.02-4.85-.08c-1.17-.04-1.8-.24-2.23-.4a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.43-.36-1.06-.4-2.23-.06-1.27-.08-1.65-.08-4.85s.02-3.58.08-4.85c.04-1.17.24-1.8.4-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07ZM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.8.72 1.47 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.63.5 2.91.56 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm6.41-10.85a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44Z" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-4 h-4">
            <path d="M15.12 8.44V6.58c0-.9.6-1.11 1.02-1.11h2.58V1.5L15.15 1.5c-3.78 0-4.64 2.83-4.64 4.64v2.3H8.4v3.94h2.11v11.62h4.4V11.38h2.9l.13-1.53.29-2.4h-3.32Z" />
        </svg>
    );
}

const SOCIALS = [
    { label: 'Instagram', href: 'https://www.instagram.com/byzayelle/', Icon: InstagramIcon },
    { label: 'TikTok', href: 'https://www.tiktok.com/@zainab.temi', Icon: TikTokIcon },
    { label: 'WhatsApp', href: 'https://wa.me/2348103029972', Icon: WhatsAppIcon },
    { label: 'Facebook', href: 'https://facebook.com/byzayelle', Icon: FacebookIcon },
];

function FooterColumnHeading({ children }: { children: React.ReactNode }) {
    return (
        <p className="font-sans text-paper font-medium uppercase tracking-[0.14em] text-[11px] mb-4">
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
                            <span className="font-serif text-paper text-[20px] sm:text-[24px] font-normal tracking-normal">
                                Zayelle
                            </span>
                        </Link>
                        <p className="font-sans text-paper/65 max-w-xs leading-relaxed text-[13px]">
                            Designed for every version of you. Fashion pieces crafted for how you actually live, with custom orders and worldwide currency support.
                        </p>

                        {/* Socials — uniform monochrome outline, inverts to solid on hover/focus */}
                        <div className="flex flex-row items-center gap-2.5 mt-1">
                            {SOCIALS.map(({ label, href, Icon }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="w-9 h-9 rounded-full border border-paper/25 flex items-center justify-center flex-shrink-0 text-paper/75 transition-all duration-200 hover:bg-paper hover:border-paper hover:text-ink hover:-translate-y-0.5 focus-visible:bg-paper focus-visible:border-paper focus-visible:text-ink outline-none"
                                >
                                    <Icon />
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
