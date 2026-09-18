'use client';

interface AuthPageShellProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

// shared centered form block for every auth screen — no card/shadow,
// just the site's own type scale (renders inside the normal Navbar/Footer)
export default function AuthPageShell({ title, subtitle, children }: AuthPageShellProps) {
    return (
        <div className="w-full bg-paper flex justify-center px-6 sm:px-10 py-14 sm:py-20">
            <div className="w-full max-w-[440px]">
                <h1 className="font-serif text-ink font-normal leading-[1.15] text-[26px] sm:text-[30px] mb-2 text-center">
                    {title}
                </h1>
                <p className="font-sans text-muted text-[13px] mb-8 leading-relaxed text-center">
                    {subtitle}
                </p>
                {children}
            </div>
        </div>
    );
}
