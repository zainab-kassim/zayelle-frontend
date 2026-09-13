const BADGES = [
    {
        title: "Worldwide Shipping",
        subtitle: "Delivered wherever you are",
        icon: (
            <path d="M2 12h20M12 2c2.5 2.6 4 6 4 10s-1.5 7.4-4 10c-2.5-2.6-4-6-4-10s1.5-7.4 4-10Z" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        title: "Made To Order",
        subtitle: "Custom pieces, built around you",
        icon: (
            <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6.3 6.3l2.8 2.8M14.9 14.9l2.8 2.8M6.3 17.7l2.8-2.8M14.9 9.1l2.8-2.8" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        title: "Secure Checkout",
        subtitle: "Encrypted payments, always",
        icon: (
            <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3ZM9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
    {
        title: "Multi-Currency",
        subtitle: "Pay in USD, GBP, CAD or NGN",
        icon: (
            <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 6.5v11M15 9c0-1.4-1.3-2.5-3-2.5s-3 1.1-3 2.5 1.3 2 3 2.5 3 1.1 3 2.5-1.3 2.5-3 2.5-3-1.1-3-2.5" strokeLinecap="round" strokeLinejoin="round" />
        ),
    },
];

export default function TrustBadges() {
    return (
        <section
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4"
            aria-label="Why shop with Zayelle"
        >
            {BADGES.map((badge) => (
                <div key={badge.title} className="flex flex-col items-center text-center gap-2 px-2">
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#171310"
                        strokeWidth="1.4"
                        className="mb-1 opacity-80"
                        aria-hidden="true"
                    >
                        {badge.icon}
                    </svg>
                    <span className="font-sans text-ink font-semibold uppercase tracking-[0.08em] text-[11px] sm:text-[12px]">
                        {badge.title}
                    </span>
                    <span className="font-sans text-muted text-[11px] sm:text-[12px]">
                        {badge.subtitle}
                    </span>
                </div>
            ))}
        </section>
    );
}
